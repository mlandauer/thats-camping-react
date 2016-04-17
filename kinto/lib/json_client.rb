require 'rest-client'
require 'json'

class JSONClient
  def self.get(url)
    JSON.parse(RestClient.get(url))
  end

  def self.post(url, data)
    JSON.parse(RestClient.post(url, data.to_json, content_type: :json))
  end

  def self.delete(url)
    JSON.parse(RestClient.delete(url))
  end
end
