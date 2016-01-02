var page = require('webpage').create();
var moment = require('moment');

page.onError = function(msg, trace) {
  console.error(msg, trace);
  phantom.exit();
}

phantom.onError = function(msg, trace) {
  console.error(msg, trace);
  phantom.exit();
}

var url = 'https://losangeles.ucbtrainingcenter.com/course/open';
url = 'http://localhost:3000/test';

page.open(url, function(status) {
  if (status !== 'success') {
    return console.error('Unable to access network');
  }

  var html = page.evaluate(function() {
    return document.body.innerHTML;
  });

  console.log(html);
  phantom.exit();
});
