var parser       = require('./parser.js');
var load_html    = require('./load_html.js');

console.log("Loading page...");
load_html(function(err, html) {
  if( err ) { return console.error(err); }
  var classes = parser.parseClasses(html);

  console.log(classes);
})
