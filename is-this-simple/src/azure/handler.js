'use strict';
if (!process.env.APP_POOL_ID) {
  process.env.NODE_PATH = `${__dirname}/node_modules`;
  require('module').Module._initPaths();
  console.log("added NODE_PATH", process.env.NODE_PATH)
}


const redis = require('redis');
const dns = require('dns');
const handler_path = process.env.APP_POOL_ID ? "./handler/" : "../handler/";
const redisEndPointData = require(process.env.APP_POOL_ID ? "./redis.lab" : "../redis.lab");
const requestLambda = require(process.env.APP_POOL_ID ? './requestLambda' : "../requestLambda");
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
  //console.log(`[${handler_path}${mod}]`, process.env.APP_POOL_ID);
  const rmod = require(`${handler_path}${mod}`)({
    redisEndPoint: redisEndPoint,
    requestLambda: requestLambda
  });
  module.exports[mod] = (context) => {
    let jsonBody = context.req.body
    rmod(jsonBody, {
      lambdaAdr: {
        host: context.req.headers,
        port: 443,
        basePath: context.req.originalUrl
      }
    }, (data) => {
      context.res = {
        status: 200,
        headers: { 'Content-Type': "application/json" },
        body: data
      };

      context.done();
    });
  }
});



/*
module.exports.hello = function (context) {
  context.log('JavaScript HTTP trigger function processed a request.');

  context.res = {
    body: 'Go Serverless v1.x! Your function executed successfully!',
  };

  context.done();
};
*/
