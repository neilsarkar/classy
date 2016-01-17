var moment       = require('moment');
var parser       = require('./lib/parser.js');
var load_html    = require('./lib/load_html.js');
var notifier     = require('./lib/notifier.js')

console.log("Loading page...");
load_html(function(err, html) {
  if( err ) { return console.error(err); }
  var classes = parser.parseClasses(html).filter(function(c) {
    return !c.sold_out;
  });

  if( !classes.length ) { return console.log("No classes found"); }

  var message = classes.map(function (c) {
    return c.teacher + ' ' + c.time + " starting " + moment(c.start_date).format('MMMM Do') + "\n" + "https://losangeles.ucbtrainingcenter.com" + c.registration_link;
  }).join("\n\n")

  notifier.sendMail({
    to: 'neil.r.sarkar@gmail.com',
    subject: classes.length == 1
      ? 'UCB Class Posted'
      : classes.length + 'UCB Classes Posted',
    text: message
  }, function(err, ok) {
    if( err ) { console.error(err); }

    console.log(message);
  })
})
