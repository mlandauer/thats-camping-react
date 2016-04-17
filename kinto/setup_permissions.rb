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

url = 'http://admin:foo2@thatscamping-kinto.herokuapp.com/v1'
bucket = "thatscamping4"

puts "Create the bucket called #{bucket} and make it readable by everyone..."
JSONClient.post(url + KintoPath.buckets,
  {data: {id: bucket}, permissions: {read: ["system.Everyone"]}})

puts "Delete all writeable collections..."
JSONClient.delete(url + KintoPath.collections(bucket))

puts "Create the collection campsite_versions..."
JSONClient.post(url + KintoPath.collections(bucket), {data: {id: "campsite_versions"}})

puts "Create the first campsite record..."
JSONClient.post(url + KintoPath.records(bucket, "campsite_versions"),
  {data: {
    id: SecureRandom.uuid,
    campsite_id: 1,
    park_id: 1,
    name: "Acacia Flat",
    description: "Explore the \"cradle of conservation\", the Blue Gum Forest. Enjoy birdwatching, long walks and plenty of photogenic flora.",
  }})

# Now double check that this actually worked

r = JSONClient.get(url + KintoPath.records(bucket, "campsite_versions"))
assert(r["data"].count == 1)
assert(r["data"].first["name"] == "Acacia Flat")
