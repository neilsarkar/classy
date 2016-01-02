var page = require('webpage').create();

page.onError = function(msg, trace) {
  throw "Page error " + msg;
  phantom.exit();
}

phantom.onError = function(msg, trace) {
  throw "Phantom error " + msg;
  phantom.exit();
}

var url = 'https://losangeles.ucbtrainingcenter.com/course/open';
url = 'http://localhost:3000/test';

page.open(url, function(status) {
  if (status !== 'success') {
    return console.error('Unable to access network');
  }

  var elements = page.evaluate(function(s) {
    return [].map.call(document.querySelectorAll(s), function(el) {
      return {
        level: el.querySelector('td.widget-text').innerHTML.trim(),
        time: el.querySelector('td:nth-child(2)').innerHTML.trim(),
        start_date: el.querySelector('td:nth-child(3)').innerHTML.trim(),
        teacher: el.querySelector('td:nth-child(4)').innerHTML.trim(),
        sold_out: !!el.querySelector('a.btn-danger'),
        registration_link: el.querySelector('a').href
      }
    });
  }, '.panel-group:nth-child(4) > .panel table tbody tr');

  for( var i = 0; i < elements.length; i++ ) {
    console.log(JSON.stringify(elements[i]));
  }

  phantom.exit();
});
