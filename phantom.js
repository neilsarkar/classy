var page = require('webpage').create();

page.onError = function(msg, trace) {
  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
   msgStack.push('TRACE:');
   trace.forEach(function(t) {
     msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
   });
  }

  console.error(msgStack.join('\n'));

  phantom.exit();
}

phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];

  if (trace && trace.length) {
   msgStack.push('TRACE:');
   trace.forEach(function(t) {
     msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
   });
  }

  console.error(msgStack.join('\n'));

  phantom.exit();
}

page.open('http://localhost:3000/test', function(status) {
// page.open('https://losangeles.ucbtrainingcenter.com/course/open', function(status) {
  if (status !== 'success') {
    return console.error('Unable to access network');
  }



  var classes = page.evaluate(function(s) {
    return document.querySelectorAll(s)
  }, '.panel-group:nth-child(4) > .panel table tbody tr');

  console.log(classes[1].innerHTML);
  // console.log(classes[1].innerHTML);
  // console.log(classes[2].innerHTML);
  // console.log(classes[3].innerHTML);
  // for( var i = 0; i < classes.length; i++ ) {
  //   console.log(i);
  //   // console.log(classes[i].innerHTML);
  // }
  phantom.exit();
});
