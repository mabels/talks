const redis = require('redis');
const requestLambda = require('./requestLambda.js');
const uuid = require('uuid');

module.exports = function(redisEndPoint) {
  return (event, context, callback) => {
    const my = redisEndPoint();
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
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(message, null, 2)
        });
      }
    });
    my.subscribe(key);

    const totalLen = "Hello World".length;
    for (let idx = 0; idx < totalLen; ++idx) {
      requestLambda('id2LetterMap', event, {
        started: new Date().getTime(),
        transaction: transaction,
        idx: idx,
        totalLen: totalLen
      }, () => { /* fire and forget */ });
    }
  }
}
