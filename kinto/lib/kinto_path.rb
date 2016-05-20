class KintoPath
  def self.server
    "/"
  end

  def self.batch
    "/batch"
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