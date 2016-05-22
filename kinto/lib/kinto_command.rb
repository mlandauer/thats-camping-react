require_relative 'kinto_path'

class KintoCommand
  attr_reader :method, :path, :body

  def initialize(method, path, body = nil)
    @method, @path, @body = method, path, body
  end

  def self.create_record(bucket, collection, data)
    KintoCommand.new(:post, KintoPath.records(bucket, collection), {data: data})
  end

  def self.create_collection(bucket, collection)
    KintoCommand.new(:post, KintoPath.collections(bucket), {data: {id: collection}})
  end

  def self.create_bucket(bucket, permissions)
    KintoCommand.new(:post, KintoPath.buckets, {data: {id: bucket}, permissions: permissions})
  end

  def self.delete_all_collections(bucket)
    KintoCommand.new(:delete, KintoPath.collections(bucket))
  end

  def self.get_records(bucket, collection, filter)
    KintoCommand.new(:get, KintoPath.records(bucket, collection) + "?#{filter}")
  end
end
