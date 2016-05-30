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
require_relative 'lib/json_client'
require_relative 'lib/kinto_runner'
require_relative 'lib/kinto_runner'

def assert(test)
  raise "Failed" unless test
end

def update_attribute_command(bucket, table, id, key, value)
  KintoCommand.create_record(bucket, "#{table}_attributes", {
    "#{table}_id" => id,
    "key" => key,
    "value" => value
  })
end

# Returns array of commands
def update_attributes(bucket, table, id, attributes)
  attributes.map do |key, value|
    update_attribute_command(bucket, table, id, key.to_s, value)
  end
end

def create_attributes_collection(bucket, table)
  KintoCommand.create_collection(bucket, "#{table}_attributes", {"record:create": ["system.Authenticated"]})
end

require 'dotenv'
Dotenv.load

# admin is the owner of the bucket and collections
admin_auth = "admin:#{ENV['THATSCAMPING_ADMIN_PASSWORD']}"
# system is the creator of the initial content
system_auth = "user:system"
bucket = "thatscamping7"
admin_runner = KintoRunner.new("http://#{admin_auth}@thatscamping-kinto.herokuapp.com/v1")
system_runner = KintoRunner.new("http://#{system_auth}@thatscamping-kinto.herokuapp.com/v1")

# First get userid from the admin auth pair
user_id = admin_runner.run(KintoCommand.get_server)["user"]["id"]
puts "In Heroku ensure that KINTO_BUCKET_CREATE_PRINCIPALS is set to #{user_id}"

puts "Create the bucket called #{bucket} and make it readable by everyone..."
admin_runner.run(KintoCommand.create_bucket(bucket, {read: ["system.Everyone"]}))

# There appears to be a problem with running this delete command in the same batch
# as a bunch of commands to add records. Very strange.
# TODO Need to investigate
# For the time being keep it out of the batch
puts "Delete all writeable collections..."
admin_runner.run(KintoCommand.delete_all_collections(bucket))

puts "Create the collections..."
commands = []
commands << create_attributes_collection(bucket, "park")
commands << create_attributes_collection(bucket, "campsite")
admin_runner.batch(commands)

puts "Create the first campsite records..."
commands = []

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

system_runner.batch(commands)

# Now double check that this actually worked
r = admin_runner.run(KintoCommand.get_records(bucket, "campsite_attributes", "key=name"))
names = r["data"].map{|r| r["value"]}.sort
assert(names == ["Acacia Flat", "Alexanders Hut",
  "Burralow Creek camping ground", "Euroka campground",
  "Euroka campground - Appletree Flat campervan and camper trailer area",
  "Ingar campground", "Mount Werong campground", "Murphys Glen campground",
  "Nunnock campground", "Perrys Lookdown campground", "Postman's camping area",
  "Six Mile Creek campground", "Waratah Gully campground"])
