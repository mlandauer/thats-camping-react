class KintoURL
  attr_reader :base_url

  def initialize(base_url)
    @base_url = base_url
  end

  def server
    "#{base_url}/"
  end

  def buckets
    "#{base_url}/buckets"
  end

  def bucket(bucket_id)
    "#{buckets}/#{bucket_id}"
  end

  def collections(bucket_id)
    "#{bucket(bucket_id)}/collections"
  end

  def collection(bucket_id, collection_id)
    "#{collections(bucket_id)}/#{collection_id}"
  end

  def records(bucket_id, collection_id)
    "#{collection(bucket_id, collection_id)}/records"
  end
end
