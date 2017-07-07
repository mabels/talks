const uuid = require('uuid');

module.exports = function(mods) {
  return (data, attr, callback) => {
    const my = mods.redisEndPoint();
    const transaction = uuid.v1();
    const key = `helloWorld-${transaction}`;
    my.on("message", function(channel, jsonMessage) {
      //console.log("helloWorld:", transaction, channel, jsonMessage);
      if (channel == key) {
        let message = JSON.parse(jsonMessage);
        message.ended = new Date().getTime();
        message.duraction = message.ended - message.started;
        my.unsubscribe(transaction);
        my.end(true);
        callback(message);
      }
    });
    my.subscribe(key);

    const totalLen = "Hello World".length;
    for (let idx = 0; idx < totalLen; ++idx) {
      mods.requestLambda('id2LetterMap', attr, {
        started: new Date().getTime(),
        transaction: transaction,
        idx: idx,
        totalLen: totalLen
      }, () => { /* fire and forget */ });
    }
  }
}
