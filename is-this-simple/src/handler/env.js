module.exports = function(mods) {
  return (data, attr, callback) => {
    const subscriber = mods.redisEndPoint();
    const publisher  = mods.redisEndPoint();
    subscriber.on("message", function(channel, message) {
      callback({
        message: process.env,
        data: data,
        attr: attr
        //redisEndPointData: redisEndPointData
        //route: fs.readFileSync("/proc/net/route").toString()
      });
      subscriber.unsubscribe("helloWorld-Test");
      subscriber.end(true);
      publisher.end(true);
    });
    subscriber.subscribe("helloWorld-Test", () => {
      publisher.publish("helloWorld-Test", "haaaaai");
    });
  }
}
