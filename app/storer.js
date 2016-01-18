var client = require('mongodb').MongoClient;
var async  = require('async');

var classes;

client.connect('mongodb://mongo/classy', function(err, db) {
  if( err ) { console.error("Unable to connect to mongodb"); throw err; }

  classes = db.collection('classes');
});

module.exports = {
  findOne: function(id, cb) {
    classes.findOne({id: id}, cb);
  },

  insert: function(classObj, cb) {
    classes.insert(classObj, cb);
  }
}
