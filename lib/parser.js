var cheerio      = require('cheerio');
var moment       = require('moment');

module.exports.parseClasses = function parseClasses(html) {
  var $ = cheerio.load(html);
  if( !$('*').length ) { return console.error('No html parsed in', html); }

  var rows = queries.rows($);

  var classes = rows.map(function(_, r) {
    r = $(r);
    return {
      time             : queries.time(r),
      teacher          : queries.teacher(r),
      start_date       : moment(queries.start_date(r), 'MMM Do, YYYY, hh:mma')._d,
      sold_out         : !!queries.sold_out_button(r).length,
      registration_link: queries.registration_link(r).attr('href')
    }
  }).toArray();

  return classes;
}

var queries = module.exports.queries = {
  rows: function($) {
    return $('td.widget-text:contains("Advanced Study Improv")').parents('tr');
  },
  time: function(row) {
    return row.find('td').eq(1).html().trim();
  },
  start_date: function(row) {
    return row.find('td').eq(2).html().trim();
  },
  teacher: function(row) {
    return row.find('td').eq(3).html().trim();
  },
  registration_link: function(row) {
    return row.find('a');
  },
  sold_out_button: function(row) {
    return row.find('a.btn-danger');
  }
}
