#!/usr/bin/env ruby

# Setup most permissions for this kinto instance
# Writing it initially in Ruby because I'll be a bit quicker for me that way.
# In the longer run it would be better if this was done consistently in js
# everywhere.

# First, get some information about the running instance

require './lib/kinto_url'
require './lib/json_client'

url = KintoURL.new('http://admin:foo2@thatscamping-kinto.herokuapp.com/v1')
bucket = "thatscamping4"

puts "Some information about the kinto server:"
p JSONClient.get(url.server)

puts "All the current buckets:"
p JSONClient.get(url.buckets)

puts "Create the bucket called #{bucket} and make it readable by everyone:"
p JSONClient.post(url.buckets,
  {data: {id: bucket}, permissions: {read: ["system.Everyone"]}})

puts "Get the #{bucket} bucket:"
p JSONClient.get(url.bucket(bucket))

puts "Create the collection campsite_versions:"
p JSONClient.post(url.collections(bucket), {data: {id: "campsite_versions"}})

puts "List all the campsite records:"
p JSONClient.get(url.records(bucket, "campsite_versions"))

uuid = SecureRandom.uuid
puts "Generated a uuid: #{uuid}"

puts "Create the first campsite record:"
p JSONClient.post(url.records(bucket, "campsite_versions"),
  {data: {
    id: uuid,
    campsite_id: 1,
    park_id: 1,
    name: "Acacia Flat",
    description: "Explore the \"cradle of conservation\", the Blue Gum Forest. Enjoy birdwatching, long walks and plenty of photogenic flora.",
  }})
