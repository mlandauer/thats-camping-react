class KintoPath
  def self.server
    "/"
  end

  def self.buckets
    "/buckets"
  end

  def self.bucket(bucket_id)
    "#{buckets}/#{bucket_id}"
  end

  def self.collections(bucket_id)
    "#{bucket(bucket_id)}/collections"
  end

  def self.collection(bucket_id, collection_id)
    "#{collections(bucket_id)}/#{collection_id}"
  end

  def self.records(bucket_id, collection_id)
    "#{collection(bucket_id, collection_id)}/records"
  end
end

class KintoURL
  attr_reader :base_url

  def initialize(base_url)
    @base_url = base_url
  end

  def server
    base_url + KintoPath.server
  end

  def buckets
    base_url + KintoPath.buckets
  end

  def bucket(bucket_id)
    base_url + KintoPath.bucket(bucket_id)
  end

  def collections(bucket_id)
    base_url + KintoPath.collections(bucket_id)
  end

  def collection(bucket_id, collection_id)
    base_url + KintoPath.collection(bucket_id, collection_id)
  end

  def records(bucket_id, collection_id)
    base_url + KintoPath.records(bucket_id, collection_id)
  end
end
