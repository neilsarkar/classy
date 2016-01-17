var should = require('should');
var fs      = require('fs');
var parser  = require('../lib/parser');
var cheerio = require('cheerio');

// verify that we get back the right data from the test DOM
describe('parser', function() {
  it('generates the right object from the dummy DOM', function() {
    var html    = fs.readFileSync(__dirname + '/test.html');
    var classes = parser.parseClasses(html);

    classes.length.should.equal(4);
    classes[0].teacher.should.equal('Will Hines');
    classes[0].sold_out.should.be.ok();
    classes[0].registration_link.should.equal('/course/advanced/12650')
  });

  it('is up to date with the live page', function(done) {
    this.timeout(15000);
    var load_html = require('../lib/load_html');
    load_html(function(err, html) {
      if( err ) { throw err; }

      var $ = cheerio.load(html);
      if( !$('*').length ) { return console.error('No html parsed in', html); }

      var rows = parser.queries.rows($);
      rows.length.should.be.above(0);
      var row = $(rows[0]);
      parser.queries.time(row).should.be.ok();
      parser.queries.start_date(row).should.be.ok();
      parser.queries.teacher(row).should.be.ok();
      parser.queries.registration_link(row).should.be.ok();
      done();
    })
  });
});
