#!/usr/bin/env ruby

# Setup most permissions for this kinto instance
# Writing it initially in Ruby because I'll be a bit quicker for me that way.
# In the longer run it would be better if this was done consistently in js
# everywhere.

# First, get some information about the running instance

require 'rest-client'
require 'json'

url = 'http://admin:foo2@thatscamping-kinto.herokuapp.com/v1'
bucket = "thatscamping4"

# puts "Some information about the kinto server:"
# p JSON.parse(RestClient.get("#{url}/"))

# puts "All the current buckets:"
# p JSON.parse(RestClient.get("#{url}/buckets"))

puts "Create the bucket called #{bucket} and make it readable by everyone:"
p JSON.parse(RestClient.post("#{url}/buckets",
  {data: {id: bucket}, permissions: {read: ["system.Everyone"]}}.to_json,
  content_type: :json))

# puts "Get the #{bucket} bucket:"
# p JSON.parse(RestClient.get("#{url}/buckets/#{bucket}"))

puts "Create the collection campsite_versions:"
p JSON.parse(RestClient.post("#{url}/buckets/#{bucket}/collections",
  {data: {id: "campsite_versions"}}.to_json,
  content_type: :json))

puts "List all the campsite records:"
p JSON.parse(RestClient.get("#{url}/buckets/#{bucket}/collections/campsite_versions/records"))

uuid = SecureRandom.uuid
puts "Generated a uuid: #{uuid}"

puts "Create the first campsite record:"
p JSON.parse(RestClient.post("#{url}/buckets/#{bucket}/collections/campsite_versions/records",
  {data: {
    id: uuid,
    campsite_id: 1,
    park_id: 1,
    name: "Acacia Flat",
    description: "Explore the \"cradle of conservation\", the Blue Gum Forest. Enjoy birdwatching, long walks and plenty of photogenic flora.",
  }}.to_json,
  content_type: :json))
