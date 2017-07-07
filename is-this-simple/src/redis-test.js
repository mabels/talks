process.env.NODE_PATH = `${__dirname}/aws/node_modules`;
require('module').Module._initPaths();
console.log("added NODE_PATH", process.env.NODE_PATH)

const redis = require("redis")
const redisEndPointData = require("./redis.lab");
const redisEndPoint = function() { 
  //console.log("redisEndPoint:", redisEndPointData);
  return redis.createClient(redisEndPointData.port, redisEndPointData.host);
}

const subscriber = redisEndPoint();
const publisher  = redisEndPoint();

subscriber.on("message", function(channel, message) {
  console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
});
subscriber.subscribe("test", () => {
  console.log("Done");
  publisher.publish("test", "haaaaai");
});
/*
publisher.publish("test", "kthxbai");

publisher.sadd("bigset", "a member");
publisher.sadd("bigset", "another member");

publisher.smembers("bigset", function(err, replies) {
  console.log(err, replies);
})

*/
