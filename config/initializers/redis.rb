uri = URI.parse(ENV["redis://rediscloud:CU8C3Iju5sYS8TVV@pub-redis-14740.us-east-1-3.1.ec2.garantiadata.com:14740"])
$redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)