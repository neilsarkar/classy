var client = require('mongodb').MongoClient;
var async  = require('async');

client.connect('mongodb://mongo/butt', function(err, db) {
  if( err ) { console.error("Unable to connect to mongodb"); throw err; }

  db.collection('poops').insert({
    cool: 'nice'
  }, function(err) {
    if( err ) { throw err; }

    db.collection('poops').find({}).toArray(function(err, poops) {
      if( err ) { throw err; }
      console.log(poops);
      db.close();
    })
  });
})
