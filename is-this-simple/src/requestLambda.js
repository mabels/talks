const https = require('https');

module.exports = (action, event, transaction, cb) => {
  const options = {
    host: event.headers.Host,
    port: 443,
    path: `/dev/${action}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  var req = https.request(options, function (res) {
    let reqData = ""
    res.on('data', function (data) { reqData += data });
    res.on('end', function () { cb(null, reqData); });
    res.on('error', function(err) { cb(err) });
  });
  req.on('error', function(err) { cb(err) });
  req.write(JSON.stringify(transaction), 'utf8');
  req.end();
}
