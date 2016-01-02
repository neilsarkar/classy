var should = require('should');
var fs      = require('fs');
var parser  = require('../parser');
var html    = fs.readFileSync(__dirname + '/test.html');
var classes = parser.parseClasses(html);
var cheerio = require('cheerio');

// verify that we get back the right data from the test DOM
classes.length.should.equal(4);
classes[0].teacher.should.equal('Will Hines');
classes[0].sold_out.should.be.ok();
classes[0].registration_link.should.equal('/course/advanced/12650')

// verify that all the elements exist on a live page
var load_html = require('../load_html');
load_html(function(err, html) {
  if( err ) { throw err; }

  var $ = cheerio.load(html);
  if( !$('*').length ) { return console.error('No html parsed in', html); }

  var rows = parser.queries.rows($);
  rows.length.should.be.above(0);
  parser.queries.time(rows[0]).should.be.ok();
  parser.queries.start_date(rows[0]).should.be.ok();
  parser.queries.teacher(rows[0]).should.be.ok();
  parser.queries.registration_link(rows[0]).should.be.ok();
})
console.log("OK.");
