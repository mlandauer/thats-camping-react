#!/usr/bin/env ruby

# Setup most permissions for this kinto instance
# Writing it initially in Ruby because I'll be a bit quicker for me that way.
# In the longer run it would be better if this was done consistently in js
# everywhere.

# First, get some information about the running instance

require 'rest-client'
require 'json'

# puts "Some information about the kinto server:"
# p JSON.parse(RestClient.get('http://thatscamping-kinto.herokuapp.com/v1/'))
#
# puts "All the current buckets:"
# p JSON.parse(RestClient.get('http://admin:foo@thatscamping-kinto.herokuapp.com/v1/buckets'))

puts "Create a bucket called thatscamping:"
p JSON.parse(RestClient.post('http://admin:foo@thatscamping-kinto.herokuapp.com/v1/buckets', {data: {id: "blog"}}.to_json, content_type: :json))
