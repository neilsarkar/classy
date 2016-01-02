var path         = require('path')
var childProcess = require('child_process')
var phantomjs    = require('phantomjs')
var binPath      = phantomjs.path
var cheerio      = require('cheerio');
var moment       = require('moment');

var childArgs = [
  path.join(__dirname, 'phantom.js')
]

console.log("Loading page...");
childProcess.execFile(binPath, childArgs, function(err, html, stderr) {
  if( err ) { throw err; }
  if( stderr ) { return console.error(stderr); }

  console.log("Parsing dom...");
  var $ = cheerio.load(html);
  if( !$('*').length ) { return console.error('No html parsed in', html); }

  var rows = $('td.widget-text:contains("Advanced Study Improv")').parents('tr');

  var classes = rows.map(function(_, r) {
    r = $(r);
    var tds = r.find('td');
    return {
      time: $(tds[1]).html().trim(),
      start_date: moment($(tds[2]).html().trim(), 'MMM Do, YYYY, hh:mma')._d,
      teacher: $(tds[3]).html().trim(),
      sold_out: !!r.find('a.btn-danger').length,
      registration_link: r.find('a').attr('href')
    }
  }).toArray();

  console.log(classes);
});
