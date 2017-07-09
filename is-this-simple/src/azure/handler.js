'use strict';

if (!process.env.APP_POOL_ID) {
  process.env.NODE_PATH = `${__dirname}/node_modules`;
  require('module').Module._initPaths();
  console.log("added NODE_PATH", process.env.NODE_PATH)
}

const redis = require('redis');
const dns = require('dns');
const url = require('url');
const path = require('path');
const base = process.env.APP_POOL_ID ? "./" : "../";
const redisEndPointData = require(`${base}redis.lab`);
const requestLambda = require(`${base}requestLambda`);
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
  const rmod = require(`${base}handler/${mod}`)({
    redisEndPoint: redisEndPoint,
    requestLambda: requestLambda
  });
  exports[mod] = (context) => {
    const jsonBody = context.req.body
    const myurl = url.parse(context.req.originalUrl);
    rmod(jsonBody, {
      lambdaAdr: {
        //https://us-central1-vibrant-mantis-723.cloudfunctions.net/helloWorld
        //host: 'us-central1-vibrant-mantis-723.cloudfunctions.net',
        host: myurl.hostname,
        port: 443,
        basePath: path.dirname(myurl.pathname)+'/'
        //basePath: '/'
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
