function complete(transaction, data, callback) {
  transaction.data = data;
  callback(transaction);
}

function segmentSize(transaction, ssize) {
  if (((transaction.segment+1)*ssize) <= transaction.totalLen) {
    return ssize;
  } else {
    return transaction.totalLen % ssize;
  }
}

module.exports = function(mods) {
  return (transaction, attr, callback) => {
    transaction.segment = ~~(transaction.idx/4);
    transaction.segmentSize = segmentSize(transaction, 4);
    const my = mods.redisEndPoint();
    const key = `letterReducer-${transaction.transaction}-${transaction.segment}`;
    my.sadd(key, JSON.stringify({ idx: transaction.idx, letter: transaction.letter }));
    my.smembers(key, function(err, replies) {
      if (replies.length < transaction.segmentSize) {
        my.end(true);
        complete(transaction, replies, callback);
      } else {
        transaction.letters = replies.map(i => JSON.parse(i));
        mods.requestLambda('toStringReducer', attr, transaction, () => {
          my.del(key);
          my.end(true);
          complete(transaction, replies, callback);
        });
      }
    });
  }
}
