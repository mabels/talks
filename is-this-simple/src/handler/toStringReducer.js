module.exports = function(mods) {
  return (transaction, attr, callback) => {
    const my = mods.redisEndPoint();
    const key = `toStringReducer-${transaction.transaction}`;
    my.sadd(key, JSON.stringify(transaction.letters));
    my.smembers(key, (err, replies) => {
      transaction.string = replies.map((i) => JSON.parse(i))
        .reduce((flat, toFlatten) => flat.concat(toFlatten), [])
        .sort((a,b) => a.idx - b.idx).map(a => a.letter).join("")
      if (transaction.string.length < transaction.totalLen) {
        my.end(true);
        callback(transaction);
      } else {
        my.publish(`helloWorld-${transaction.transaction}`, JSON.stringify(transaction));
        my.del(key)
        my.end(true);
        callback(transaction);
      }
    });
  }
}
