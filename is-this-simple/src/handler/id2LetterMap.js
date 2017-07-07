module.exports = function(mods) {
  return (transaction, attr, callback) => {
    transaction.letter = "Hello World"[transaction.idx];
    mods.requestLambda('letterReducer', attr, transaction, () => {
      callback(transaction);
    });
  }
}
