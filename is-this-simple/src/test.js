const AWS = require("aws-sdk");
const uuid = require("uuid");
const dns = require('dns');

dns.resolve('www.google.com', (e,r) =>{
  console.log(e, r);
})



var sqs = new AWS.SQS({ region: "eu-west-1" });

function sqsWaitResult(event, callback) {
  const params = {
    QueueUrl: "https://sqs.eu-west-1.amazonaws.com/973800055156/dev-to-hw.fifo",
    VisibilityTimeout: 3,
    WaitTimeSeconds: 10 // Longpolling
  };

  console.log("sqsWaitResult:", params);
  sqs.receiveMessage(params, (a,data) => {
    console.log("CB:", a, data);
    if (data && data.Messages) {
      var params = {
        QueueUrl: "https://sqs.eu-west-1.amazonaws.com/973800055156/dev-to-hw.fifo",
        ReceiptHandle: data.Messages[0].ReceiptHandle,
        VisibilityTimeout: 0 /* required */
      }
      sqs.changeMessageVisibility(params, (a,b) => {
        console.log("CV:", a, b);
        var params = {
          QueueUrl: "https://sqs.eu-west-1.amazonaws.com/973800055156/dev-to-hw.fifo",
          ReceiptHandle: data.Messages[0].ReceiptHandle
        }
        /*
        sqs.deleteMessage(params, function(err, data) {
          console.log(err, data);
        });
        */
      });
    }
  });
}

sqsWaitResult()

/*


var docClient = new AWS.DynamoDB.DocumentClient()

var table = "serverless-hello-world-dev-letter-reducer";

const transaction = uuid.v1();
const segment = 4711;

for (let letter of ['h', 'a', 'l', 'L', 'o']) {
  const params = {
    TableName: table,
    Key:{
      transaction_segment: [transaction, segment].join("-"),
  //letters: []
},
    UpdateExpression: "SET letters = list_append(if_not_exists(letters, :empty_list), :val)",
    ExpressionAttributeValues:{
      ":val":  [ letter ],
      ":empty_list": [ ]
},
    ReturnValues:"NONE"
};

  console.log("Updating the item...", params.Key.transaction_segment);
  docClient.update(params, function(err, data) {
    if (err) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
} else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
}
});
}
*/
