var moment    = require('moment');
var parser    = require('./parser.js');
var load_html = require('./load_html.js');
var notifier  = require('./notifier.js')
var async     = require('async');
var debug     = require('debug')('classy');
var _         = require('lodash')
var client    = require('mongodb').MongoClient;

var collection;

client.connect('mongodb://mongo/classy', function(err, db) {
  if( err ) { console.error("Unable to connect to mongodb"); throw err; }

  collection = db.collection('classes');
  debug('Loading page...');
  async.waterfall([
    load_html,
    parseClasses,
    dedupe,
    sendEmails,
    storeClasses
  ], function(err, ok) {
    if( err ) { console.error(err); }
    else      { console.log("OK"); }
    db.close();
  })
});

function parseClasses(html, cb) {
  var classes = parser.parseClasses(html);
  debug('Classes parsed', classes);

  classes = classes.filter(function(c) {
    return !c.sold_out;
  });

  if( !classes.length ) { return cb('No classes parsed from html'); }
  cb(null, classes);
}

// remove classes we've already seen
function dedupe(classes, cb) {
  var ids = classes.map(function(c) { return c.id});
  debug('Looking for classes with ids', ids);

  var result = [];
  collection.find({id: { $in: ids}}, {_id: false, id: true}).toArray(function(err, matches) {
    debug('Matches in db', matches);
    classes = _.reject(classes, function(c) {
      for( var i = 0; i < matches.length; i++ ) {
        if( c.id == matches[i].id ) { return true; }
      }
      return false;
    })

    if( !classes.length ) { return cb("No classes found we haven't already seen"); }
    return cb(null, classes);
  })
}

function sendEmails(classes, cb) {
  var message = classes.map(function (c) {
    return c.teacher + ' ' + c.time + " starting " + moment(c.start_date).format('MMMM Do') + "\n" + "https://losangeles.ucbtrainingcenter.com" + c.registration_link;
  }).join("\n\n")

  debug(message);

  notifier.sendMail({
    to: 'neil.r.sarkar@gmail.com',
    subject: classes.length == 1
      ? 'UCB Class Posted'
      : classes.length + 'UCB Classes Posted',
    text: message
  }, function(err, ok) {
    if( err ) { return cb(err); }
    return cb(null, classes);
  });
}

function storeClasses(classes, cb) {
  collection.insertMany(classes, cb);
}
