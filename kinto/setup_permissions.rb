#!/usr/bin/env ruby

# Setup most permissions for this kinto instance
# Writing it initially in Ruby because I'll be a bit quicker for me that way.
# In the longer run it would be better if this was done consistently in js
# everywhere.

# First, get some information about the running instance

require 'rest-client'
require 'json'

puts "Some information about the kinto server:"
p JSON.parse(RestClient.get('http://thatscamping-kinto.herokuapp.com/v1/'))
