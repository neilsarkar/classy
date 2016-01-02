// A simple test server for debugging phantom.js issues
var express = require('express');
var app = express();

app.get('/test', function(req, res) {
  res.sendFile(__dirname + '/test.html');
})

app.listen(3000, function(err) {
  if( err ) { throw err; }
  console.log("Listening on port 3000");
})
