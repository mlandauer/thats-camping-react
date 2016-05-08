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
puts "Create the first campsite record..."

park1 = SecureRandom.uuid
campsite1 = SecureRandom.uuid

# TODO Check return codes on batch command
runner.batch([
  KintoCommand.new(:post, KintoPath.collections(bucket),
    {data: {id: "park_attributes"}}),
  KintoCommand.new(:post, KintoPath.collections(bucket),
    {data: {id: "campsite_attributes"}}),
  KintoCommand.new(:post, KintoPath.records(bucket, "park_attributes"), {
      data: {
        park_id: park1,
        key: "name",
        value: "Blue Mountains National Park"
      }
    }),
  KintoCommand.new(:post, KintoPath.records(bucket, "park_attributes"), {
      data: {
        park_id: park1,
        key: "description",
        value: "More than three million people come to Blue Mountains National Park each year. For many it's enough just to find a lookout and gaze across the park's chiselled sandstone outcrops and hazy blue forests. Others walk or cycle along the cliff-tops and in the valleys, following paths that were created for Victorian-era honeymooners, or discovered by Aboriginal hunters many thousands of years ago. Over 140 km of walking tracks of all grades (some accessible for people with a disability) in diverse settings make the Blue Mountains a bushwalker's paradise.\n\nThis park, which is part of the Greater Blue Mountains World Heritage Area, protects an unusually diverse range of vegetation communities. There are rare and ancient plants and isolated animal populations tucked away in its deep gorges. The Greater Blue Mountains Drive, winner of the 2008 Australian Tourism Award for New Tourism Development, links a vast and spectacular world heritage landscape and a number of national parks to the regions that surround it."
      }
    }),
  KintoCommand.new(:post, KintoPath.records(bucket, "campsite_attributes"),
    {data: {
      campsite_id: campsite1,
      key: "park_id",
      value: park1
    }}),
  KintoCommand.new(:post, KintoPath.records(bucket, "campsite_attributes"),
    {data: {
      campsite_id: campsite1,
      key: "name",
      value: "Acacia Flat"
    }}),
  KintoCommand.new(:post, KintoPath.records(bucket, "campsite_attributes"),
    {data: {
      campsite_id: campsite1,
      key: "description",
      value: "Explore the \"cradle of conservation\", the Blue Gum Forest. Enjoy birdwatching, long walks and plenty of photogenic flora."
    }})
  ])

# Now double check that this actually worked
r = runner.run(KintoCommand.new(:get, KintoPath.records(bucket, "campsite_attributes") + "?key=name"))
assert(r["data"].map{|r| r["value"]}.sort == ["Acacia Flat"])
