var path         = require('path')
var childProcess = require('child_process')
var phantomjs    = require('phantomjs')
var binPath      = phantomjs.path

var childArgs = [
  path.join(__dirname, 'phantom.js')
]

module.exports = function(cb) {
  childProcess.execFile(binPath, childArgs, function(err, html, stderr) {
    if( err ) { return cb(err); }
    if( stderr ) { return cb(stderr); }
    cb(null, html);
  });
}
