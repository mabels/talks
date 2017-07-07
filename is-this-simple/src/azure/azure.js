'use strict';

const redis = require('redis');
const dns = require('dns');
const redisEndPointData = require("../redis.lab");
const requestLambda = require("../requestLambda");
const redisEndPoint = function() {
  //console.log("redisEndPoint:", redisEndPointData);
  return redis.createClient(redisEndPointData.port, redisEndPointData.host);
}

dns.resolve(redisEndPointData.host, (e,r) =>{
  if (!e) {
    redisEndPointData.host = r[0];
  }
});

const mods = {
'env': require('../handler/env'),
'helloWorld': require('../handler/helloWorld'),
'toStringReducer': require('../handler/toStringReducer'),
'id2LetterMap': require('../handler/id2LetterMap'),
'letterReducer': require('../handler/letterReducer')
};

for (let mod in mods) {
  //console.log(`[${handler_path}${mod}]`, process.env.APP_POOL_ID);
  const rmod = mods[mod]({
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
}



/*
module.exports.hello = function (context) {
  context.log('JavaScript HTTP trigger function processed a request.');

  context.res = {
    body: 'Go Serverless v1.x! Your function executed successfully!',
  };

  context.done();
};
*/
