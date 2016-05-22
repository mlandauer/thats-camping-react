class KintoCommand
  attr_reader :method, :path, :body

  def initialize(method, path, body = nil)
    @method, @path, @body = method, path, body
  end
end
