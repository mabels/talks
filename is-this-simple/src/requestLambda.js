const https = require('https');

module.exports = (action, attr, transaction, cb) => {
  const pb = attr.lambdaAdr.pathBuilder ? attr.lambdaAdr.pathBuilder : (a) => a;
  const options = {
    host: attr.lambdaAdr.host,
    port: attr.lambdaAdr.port,
    path: `${attr.lambdaAdr.basePath}${pb(action)}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  //attr.context.log("requestLambda:", options);
  const req = https.request(options, function (res) {
    let reqData = ""
    res.on('data', function (data) { reqData += data });
    res.on('end', function () { cb(null, reqData); });
    res.on('error', function(err) { cb(err) });
  });
  req.on('error', function(err) { cb(err) });
  req.write(JSON.stringify(transaction), 'utf8');
  req.end();
  return options;
}
