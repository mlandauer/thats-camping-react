#!/usr/bin/env ruby

# Setup most permissions for this kinto instance
# Writing it initially in Ruby because I'll be a bit quicker for me that way.
# In the longer run it would be better if this was done consistently in js
# everywhere.

# WARNING: This will delete everything in the kinto bucket for the app so
# use with extreme caution. i.e. DON'T USE THIS ON A PRODUCTION INSTANCE
# WHERE PEOPLE HAVE EDITED INFORMATION - BECAUSE THAT INFORMATION WILL BE LOST!

require './lib/kinto_url'
require './lib/json_client'

url = KintoURL.new('http://admin:foo2@thatscamping-kinto.herokuapp.com/v1')
bucket = "thatscamping4"

puts "Create the bucket called #{bucket} and make it readable by everyone:"
p JSONClient.post(url.buckets,
  {data: {id: bucket}, permissions: {read: ["system.Everyone"]}})

puts "Delete all writeable collections:"
p JSONClient.delete(url.collections(bucket))

puts "Create the collection campsite_versions:"
p JSONClient.post(url.collections(bucket), {data: {id: "campsite_versions"}})

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
