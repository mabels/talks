'use strict';

if (!process.env.__OW_API_HOST) {
  process.env.NODE_PATH = `${__dirname}/node_modules`;
  require('module').Module._initPaths();
  console.log("added NODE_PATH", process.env.NODE_PATH)
}

const redis = require('redis');
const dns = require('dns');
const handler_path = process.env.__OW_API_HOST ? "./handler/" : "../handler/";
const redisEndPointData = require(process.env.__OW_API_HOST ? "./redis.lab" : "../redis.lab");
const requestLambda = require(process.env.__OW_API_HOST ? './requestLambda' : "../requestLambda");
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
  //console.log(`[${handler_path}${mod}]`, process.env.GCP_PROJECT);
  const rmod = require(`${handler_path}${mod}`)({
    redisEndPoint: redisEndPoint,
    requestLambda: requestLambda
  });
  exports[mod] = (params) => {
    //return { body: "Hello:"+params.__ow_body, payload: "doof" };
    let jsonBody = params; //JSON.parse(params.body);
    return new Promise((resolve, reject) => {
      rmod(jsonBody, {
        lambdaAdr: {
          host: redisEndPointData.bmix.myself,
          port: 443,
          basePath: "/bmix/",
          pathBuilder: (a) => `${a}/${a}`
        }
      }, (data) => {
        resolve({ payload: data });
      });
    });
  }
});



/*
function helloWorld(params) {
  const name = params.name || 'World';
  return { payload: `Hello, ${name}!` };
}

exports.helloWorld = helloWorld;
*/

