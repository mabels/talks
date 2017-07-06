const redis = require('redis');
const requestLambda = require('./requestLambda.js');

function complete(transaction, data, callback) {
  transaction.data = data;
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(transaction)
  });
}

function segmentSize(transaction, ssize) {
  if (((transaction.segment+1)*ssize) <= transaction.totalLen) {
    return ssize;
  } else {
    return transaction.totalLen % ssize;
  }
}

module.exports = function(redisEndPoint) {
  return (event, context, callback) => {
    let transaction = JSON.parse(event.body);
    transaction.segment = ~~(transaction.idx/4);
    transaction.segmentSize = segmentSize(transaction, 4);
    const my = redisEndPoint();
    const key = `letterReducer-${transaction.transaction}-${transaction.segment}`;
    my.sadd(key, JSON.stringify({ idx: transaction.idx, letter: transaction.letter }));
    my.smembers(key, function(err, replies) {
      if (replies.length < transaction.segmentSize) {
        my.end(true);
        complete(transaction, replies, callback);
      } else {
        transaction.letters = replies.map(i => JSON.parse(i));
        requestLambda('toStringReducer', event, transaction, () => {
          my.del(key);
          my.end(true);
          complete(transaction, replies, callback);
        });
      }
    });
  }
}
