var redis = require("redis")
  , subscriber = redis.createClient()
  , publisher  = redis.createClient();

subscriber.on("message", function(channel, message) {
  console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
});
subscriber.subscribe("test");

publisher.publish("test", "haaaaai");
publisher.publish("test", "kthxbai");

publisher.sadd("bigset", "a member");
publisher.sadd("bigset", "another member");

publisher.smembers("bigset", function(err, replies) {
  console.log(err, replies);
})

