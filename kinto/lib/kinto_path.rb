class KintoPartialPath
  def self.bucket
    ""
  end

  def self.collections
    "/collections"
  end

  def self.collection(collection_id)
    "/collections/#{collection_id}"
  end

  def self.records(collection_id)
    "/collections/#{collection_id}/records"
  end
end

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
    "#{buckets}/#{bucket_id}#{KintoPartialPath.collections}"
  end

  def self.collection(bucket_id, collection_id)
    "#{buckets}/#{bucket_id}#{KintoPartialPath.collection(collection_id)}"
  end

  def self.records(bucket_id, collection_id)
    "#{buckets}/#{bucket_id}#{KintoPartialPath.records(collection_id)}"
  end
end
