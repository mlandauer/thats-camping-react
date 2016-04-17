#!/usr/bin/env ruby

# Setup most permissions for this kinto instance
# Writing it initially in Ruby because I'll be a bit quicker for me that way.
# In the longer run it would be better if this was done consistently in js
# everywhere.

# WARNING: This will delete everything in the kinto bucket for the app so
# use with extreme caution. i.e. DON'T USE THIS ON A PRODUCTION INSTANCE
# WHERE PEOPLE HAVE EDITED INFORMATION - BECAUSE THAT INFORMATION WILL BE LOST!

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
end

url = 'http://admin:foo2@thatscamping-kinto.herokuapp.com/v1'
bucket = "thatscamping4"
runner = KintoRunner.new(url)

puts "Create the bucket called #{bucket} and make it readable by everyone..."
runner.run(KintoCommand.new(:post, KintoPath.buckets,
  {data: {id: bucket}, permissions: {read: ["system.Everyone"]}}))

puts "Delete all writeable collections..."
runner.run(KintoCommand.new(:delete, KintoPath.collections(bucket)))

puts "Create the collection campsite_versions..."
runner.run(KintoCommand.new(:post, KintoPath.collections(bucket),
  {data: {id: "campsite_versions"}}))

puts "Create the first campsite record..."
runner.run(KintoCommand.new(:post, KintoPath.records(bucket, "campsite_versions"),
  {data: {
    id: SecureRandom.uuid,
    campsite_id: 1,
    park_id: 1,
    name: "Acacia Flat",
    description: "Explore the \"cradle of conservation\", the Blue Gum Forest. Enjoy birdwatching, long walks and plenty of photogenic flora.",
  }}))

# Now double check that this actually worked
r = runner.run(KintoCommand.new(:get, KintoPath.records(bucket, "campsite_versions")))
assert(r["data"].count == 1)
assert(r["data"].first["name"] == "Acacia Flat")
