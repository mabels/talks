const redis = require('redis');
const requestLambda = require('./requestLambda.js');

function complete(transaction, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(transaction)
  });
}

module.exports = function(redisEndPoint) {
  return (event, context, callback) => {
    let transaction = JSON.parse(event.body);
    const my = redisEndPoint();
    const key = `toStringReducer-${transaction.transaction}`;
    my.sadd(key, JSON.stringify(transaction.letters));
    my.smembers(key, (err, replies) => {
      transaction.string = replies.map((i) => JSON.parse(i))
        .reduce((flat, toFlatten) => flat.concat(toFlatten), [])
        .sort((a,b) => a.idx - b.idx).map(a => a.letter).join("")
      if (transaction.string.length < transaction.totalLen) {
        my.end(true);
        complete(transaction, callback);
      } else {
        my.publish(`helloWorld-${transaction.transaction}`, JSON.stringify(transaction));
        my.del(key)
        my.end(true);
        complete(transaction, callback);
      }
    });
  }
}
