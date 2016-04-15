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
# p JSON.parse(RestClient.get(url + '/'))

# puts "All the current buckets:"
# p JSON.parse(RestClient.get(url + '/buckets'))

puts "Create the bucket called #{bucket}:"
p JSON.parse(RestClient.post(url + '/buckets', {data: {id: bucket}, permissions: {read: ["system.Everyone"]}}.to_json, content_type: :json))

puts "Get the #{bucket} bucket"
p JSON.parse(RestClient.get(url + '/buckets/' + bucket))
