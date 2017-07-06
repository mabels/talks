const requestLambda = require('./requestLambda.js');

module.exports = function(_) {
  return (event, context, callback) => {
    let transaction = JSON.parse(event.body);
    transaction.letter = "Hello World"[transaction.idx];
    requestLambda('letterReducer', event, transaction, () => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(transaction)
      });
    });
  }
}
