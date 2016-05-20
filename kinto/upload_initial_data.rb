#!/usr/bin/env ruby

# Setup most permissions for this kinto instance
# Writing it initially in Ruby because I'll be a bit quicker for me that way.
# In the longer run it would be better if this was done consistently in js
# everywhere.

# WARNING: This will delete everything in the kinto bucket for the app so
# use with extreme caution. i.e. DON'T USE THIS ON A PRODUCTION INSTANCE
# WHERE PEOPLE HAVE EDITED INFORMATION - BECAUSE THAT INFORMATION WILL BE LOST!

require 'yaml'
require 'securerandom'
require './lib/kinto_path'
require './lib/json_client'

def assert(test)
  raise "Failed" unless test
end

class KintoCommand
  attr_reader :method, :path, :body

  def initialize(method, path, body = nil)
    @method, @path, @body = method, path, body
  end
end

class KintoRunner
  attr_reader :url

  def initialize(url)
    @url = url
  end

  def run(command)
    if command.method == :get
      JSONClient.get(url + command.path)
    elsif command.method == :post
      JSONClient.post(url + command.path, command.body)
    elsif command.method == :delete
      JSONClient.delete(url + command.path)
    else
      raise "Unsupported method"
    end
  end

  def batch(commands)
    # Kinto by default supports up to 25 commands in a batch operation
    # This is configurable - we're assuming the default for the time being
    commands.each_slice(25) do |commands_chunk|
      requests = commands_chunk.map do |command|
        v = {
          method: command.method.upcase,
          path: command.path,
        }
        v[:body] = command.body if command.body
        v
      end
      run(KintoCommand.new(:post, KintoPath.batch, {requests: requests}))
    end
  end
end

def update_attribute_command(bucket, table, id, key, value)
  KintoCommand.new(:post, KintoPath.records(bucket, "#{table}_attributes"), {
      data: {
        "#{table}_id" => id,
        "key" => key,
        "value" => value
      }
    })
end

# Returns array of commands
def update_attributes(bucket, table, id, attributes)
  attributes.map do |key, value|
    update_attribute_command(bucket, table, id, key.to_s, value)
  end
end

def create_attributes_collection(bucket, table)
  KintoCommand.new(:post, KintoPath.collections(bucket),
    {data: {id: "#{table}_attributes"}})
end

require 'dotenv'
Dotenv.load

password = ENV['THATSCAMPING_ADMIN_PASSWORD']
url = "http://admin:#{password}@thatscamping-kinto.herokuapp.com/v1"
bucket = "thatscamping7"
runner = KintoRunner.new(url)

# First get userid from the admin auth pair
user_id = runner.run(KintoCommand.new(:get, KintoPath.server))["user"]["id"]
puts "In Heroku ensure that KINTO_BUCKET_CREATE_PRINCIPALS is set to #{user_id}"

puts "Create the bucket called #{bucket} and make it readable by everyone..."
runner.run(KintoCommand.new(:post, KintoPath.buckets,
  {data: {id: bucket}, permissions: {read: ["system.Everyone"]}}))

# There appears to be a problem with running this delete command in the same batch
# as a bunch of commands to add records. Very strange.
# TODO Need to investigate
# For the time being keep it out of the batch
puts "Delete all writeable collections..."
runner.run(KintoCommand.new(:delete, KintoPath.collections(bucket)))

puts "Create the collections..."
puts "Create the first campsite records..."

park1 = SecureRandom.uuid

# TODO Check return codes on batch command
commands = []

commands << create_attributes_collection(bucket, "park")
commands << create_attributes_collection(bucket, "campsite")

# Let's load the real data
data = JSON.parse(File.read("../data_simplified.json"))
# Let's shuffle the campsites so that they are findable by id
campsites = {}
data["campsites"].each do |c|
  campsites[c["id"]] = c
end

# For the time being only add the first park (to make things faster
# while testing)
data["parks"] = data["parks"][0..1]

data["parks"].each do |p|
  park_id = SecureRandom.uuid
  commands += update_attributes(bucket, "park", park_id,
    name: p["name"],
    description: p["description"]
  )
  # Now let's add all the campsites for this park
  p["campsite_ids"].each do |i|
    campsite_data = campsites[i]
    commands += update_attributes(bucket, "campsite", SecureRandom.uuid,
      park_id: park_id,
      name: campsite_data["name"],
      description: campsite_data["description"],
      position: campsite_data["position"],
      facilities: campsite_data["facilities"],
      access: campsite_data["access"]
    )
  end
end

runner.batch(commands)

# Now double check that this actually worked
r = runner.run(KintoCommand.new(:get, KintoPath.records(bucket, "campsite_attributes") + "?key=name"))
names = r["data"].map{|r| r["value"]}.sort
assert(names == ["Acacia Flat", "Alexanders Hut",
  "Burralow Creek camping ground", "Euroka campground",
  "Euroka campground - Appletree Flat campervan and camper trailer area",
  "Ingar campground", "Mount Werong campground", "Murphys Glen campground",
  "Nunnock campground", "Perrys Lookdown campground", "Postman's camping area",
  "Six Mile Creek campground", "Waratah Gully campground"])
