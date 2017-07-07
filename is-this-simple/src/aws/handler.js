'use strict';

if (!process.env.AWS_REGION) {
  process.env.NODE_PATH = `${__dirname}/node_modules`;
  require('module').Module._initPaths();
  console.log("added NODE_PATH", process.env.NODE_PATH)
}
const redis = require('redis');
const dns = require('dns');
const handler_path = process.env.AWS_REGION ? "./handler/" : "../handler/";
const redisEndPointData = require(process.env.AWS_REGION ? "./redis.lab" : "../redis.lab");
const requestLambda = require(process.env.AWS_REGION ? './requestLambda' : "../requestLambda");
const redisEndPoint = function() { 
  //console.log("redisEndPoint:", redisEndPointData);
  return redis.createClient(redisEndPointData.port, redisEndPointData.host);
}

dns.resolve(redisEndPointData.host, (e,r) =>{
  if (!e) {
    redisEndPointData.host = r[0];
  }
});

['env', 'helloWorld', 'toStringReducer', 'id2LetterMap', 'letterReducer'].forEach((mod) => {
  console.log(`[${handler_path}${mod}]`, process.env.AWS_REGION);
  const rmod = require(`${handler_path}${mod}`)({ 
    redisEndPoint: redisEndPoint, 
    requestLambda: requestLambda
  });
  module.exports[mod] = (event, context, callback) => {
    let jsonBody = (event.body && event.body.length==0) ? null : JSON.parse(event.body);
    rmod(jsonBody, {
      lambdaAdr: {
                    host: event.headers.Host,
                    port: 443,
                    basePath: "/dev/"
                 }
    }, (data) => callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data, null, 2)
      }));
  }
});



