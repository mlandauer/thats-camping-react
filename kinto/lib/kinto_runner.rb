require_relative 'kinto_command'

class KintoRunner
  attr_reader :url

  def initialize(url)
    @url = url
  end

  def run(command)
    if command.method == :get
      JSONClient.get(url + command.path)
    elsif command.method == :post
      JSONClient.post(url + command.path, command.body)
    elsif command.method == :delete
      JSONClient.delete(url + command.path)
    else
      raise "Unsupported method"
    end
  end

  def batch(commands)
    # Kinto by default supports up to 25 commands in a batch operation
    # This is configurable - we're assuming the default for the time being
    commands.each_slice(25) do |commands_chunk|
      requests = commands_chunk.map do |command|
        v = {
          method: command.method.upcase,
          path: command.path,
        }
        v[:body] = command.body if command.body
        v
      end
      r = run(KintoCommand.batch(requests))
      # Find the first response that is an error
      error = r["responses"].find{|r| r["status"] != 201}
      raise error.to_s if error
    end
  end
end
