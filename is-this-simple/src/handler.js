'use strict';
//const https = require('https');
//const AWS = require('aws-sdk');
const redis = require('redis');
const dns = require('dns');
//const fs = require('fs');

//const dynamoDb = new AWS.DynamoDB.DocumentClient();
//const lambda = new AWS.Lambda({region: process.env.AWS_REGION });
//const sqs = new AWS.SQS({ region: process.env.AWS_REGION });
//const elasticache = new AWS.ElastiCache({ region: process.env.AWS_REGION });
//const redisHost = "adviser-redis.qdwfki.0001.euw1.cache.amazonaws.com";
//const redisEndPoint = { host: "172.18.0.8", port: 6379 };
const redisEndPointData = { host: process.env.RedisHost, port: process.env.RedisPort };
const redisEndPoint = function() { 
  //console.log("redisEndPoint:", redisEndPointData);
  return redis.createClient(redisEndPointData.port, redisEndPointData.host);
}

dns.resolve(redisEndPointData.host, (e,r) =>{
  if (!e) {
    redisEndPointData.host = r[0];
  }
})

for (let mod of ['helloWorld', 'toStringReducer', 'id2LetterMap', 'letterReducer']) {
  module.exports[mod] = require(`./${mod}`)(redisEndPoint);
}

module.exports.env = (event, context, callback) => {
  const subscriber = redisEndPoint();
  const publisher  = redisEndPoint();
  subscriber.on("message", function(channel, message) {
    //console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: process.env,
        input: event,
        //redisEndPointData: redisEndPointData
        //route: fs.readFileSync("/proc/net/route").toString()
      }, null, 2),
    };

    callback(null, response);
    subscriber.end(true);
    publisher.end(true);
  });
  subscriber.subscribe("test");
  publisher.publish("test", "haaaaai");
}


