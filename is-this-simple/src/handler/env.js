module.exports = function(mods) {
  return (data, attr, callback) => {
    const subscriber = mods.redisEndPoint();
    const publisher  = mods.redisEndPoint();
    subscriber.on("message", function(channel, message) {
      callback({
        message: process.env,
        data: data
        //redisEndPointData: redisEndPointData
        //route: fs.readFileSync("/proc/net/route").toString()
      });
      subscriber.end(true);
      publisher.end(true);
    });
    subscriber.subscribe("test");
    publisher.publish("test", "haaaaai");
  }
}
