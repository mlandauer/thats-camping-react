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
    requests = commands.map do |command|
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

url = 'http://admin:foo2@thatscamping-kinto.herokuapp.com/v1'
bucket = "thatscamping4"
runner = KintoRunner.new(url)

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

# TODO Check return codes on batch command
commands = []

commands << create_attributes_collection(bucket, "park")
commands << create_attributes_collection(bucket, "campsite")

commands += update_attributes(bucket, "park", park1,
  name: "Blue Mountains National Park",
  description: "More than three million people come to Blue Mountains National Park each year. For many it's enough just to find a lookout and gaze across the park's chiselled sandstone outcrops and hazy blue forests. Others walk or cycle along the cliff-tops and in the valleys, following paths that were created for Victorian-era honeymooners, or discovered by Aboriginal hunters many thousands of years ago. Over 140 km of walking tracks of all grades (some accessible for people with a disability) in diverse settings make the Blue Mountains a bushwalker's paradise.\n\nThis park, which is part of the Greater Blue Mountains World Heritage Area, protects an unusually diverse range of vegetation communities. There are rare and ancient plants and isolated animal populations tucked away in its deep gorges. The Greater Blue Mountains Drive, winner of the 2008 Australian Tourism Award for New Tourism Development, links a vast and spectacular world heritage landscape and a number of national parks to the regions that surround it."
)
commands += update_attributes(bucket, "campsite", SecureRandom.uuid,
  park_id: park1,
  name: "Acacia Flat",
  description: "Explore the \"cradle of conservation\", the Blue Gum Forest. Enjoy birdwatching, long walks and plenty of photogenic flora."
)
commands += update_attributes(bucket, "campsite", SecureRandom.uuid,
  park_id: park1,
  name: "Burralow Creek camping ground",
  description: "Burralow is a beautiful picnic and camping area - so close to Sydney yet so far away. Set in a grassed open area among the scribbly gums this campground is ideally suited to families or small groups. Look out for the rare giant dragonfly on the Bulcamatta Falls convict walking track (one hour return; easy grade).\n\nYou'll need to bring drinking water and firewood with you - gathering native vegetation is strictly prohibited as it is valuable habitat for wildlife. You can buy firewood from local service stations at Richmond, North Richmond or Kurmond. Please take all garbage when you leave."
)

runner.batch(commands)

# Now double check that this actually worked
r = runner.run(KintoCommand.new(:get, KintoPath.records(bucket, "campsite_attributes") + "?key=name"))
assert(r["data"].map{|r| r["value"]}.sort == ["Acacia Flat", "Burralow Creek camping ground"])
