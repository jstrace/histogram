
var request = require('superagent');
var clear = require('clear');
var Batch = require('batch');
var histo = require('..');

var batch = new Batch;
var data = [];

batch.concurrency(20);

for (var i = 0; i < 200; i++) {
  batch.push(function(done){
    process.stdout.write('.');
    var start = new Date;
    request.get('https://segment.io', function(){
      var delta = new Date - start;
      data.push(delta);
      done();
    });
  });
}

batch.end(done);

function done() {
  clear();
  console.log(histo(data));
}

