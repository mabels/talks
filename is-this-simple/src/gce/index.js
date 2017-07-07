'use strict';

if (!process.env.GCP_PROJECT) {
  process.env.NODE_PATH = `${__dirname}/node_modules`;
  require('module').Module._initPaths();
  console.log("added NODE_PATH", process.env.NODE_PATH)
}


const redis = require('redis');
const dns = require('dns');
const handler_path = process.env.GCP_PROJECT ? "./handler/" : "../handler/";
const redisEndPointData = require(process.env.GCP_PROJECT ? "./redis.lab" : "../redis.lab");
const requestLambda = require(process.env.GCP_PROJECT ? './requestLambda' : "../requestLambda");
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
  exports[mod] = (request, respond) => {
    let jsonBody = request.body
    rmod(jsonBody, {
      lambdaAdr: {
                    host: request.hostname,
                    port: 443,
                    basePath: "/"
                 }
    }, (data) => respond
      .status(200)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(data, null, 2)));
  }
});



