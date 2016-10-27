var express = require('express');
var https = require('https');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
  res.send('Welcome to our super-simple test harness. Visit thisUrl.com/:DASH_VERSION/:GIST_SETTINGS_ID/:GIST_FUNCTIONS_FILE_ID to see your React-Dash!');
});

app.get('/:v/:user/:gid1/:gid2', function (req, res) {
  console.log(req.params);
  var basePath = 'gist.githubusercontent.com';
  var body = [];
  var opts = {};
  opts.host = basePath;
  opts.path = path.join('/',req.params.user, req.params.gid1, 'raw');
  opts.method = 'GET';
  opts.headers = {
    Accept: '*/*',
    'User-Agent': 'curl/7.47.0'
  };
  
  console.log(opts);

  var request = https.request(opts, (gist1) => {
    gist1.on('data', (chunk) => {
      console.log('CHUNK');
      console.log(chunk);
      body.push(chunk);
    });

    gist1.on('end', () => {
      var payload = Buffer.concat(body).toString();
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log(body);
      console.log(payload);
    });
  
    gist1.on('error', function (err) {
      console.log(err)
    });
  });

  
  request.end();
  // load gist2
  res.send('<ul>\
              <li>DASH VERSION :   ' + req.params.v      + '</li>\
              <li>GITHUB USER  :   ' + req.params.user   + '</li>\
              <li>SETTINGS ID  :   ' + req.params.gid1   + '</li>\
              <li>FUNCTIONS ID :   ' + req.params.gid2   + '</li>\
            </ul>');
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});

/**** UTILITY ****/
function getGist(opts) {
  
}
