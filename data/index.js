var fs = require('fs');
var OSMStream = require('node-osm-stream');
var JSONStream = require('JSONStream');
var EOL = require('os').EOL;

var source      = __dirname + '/madeira.osm';
var destination = __dirname + '/madeira.json';

var readstream  = fs.createReadStream(source);

var parser      = OSMStream();

var writestream = fs.createWriteStream(destination);

var jsonParser;

readstream
  .pipe(parser)
  .pipe(writestream);

readstream.on('open', function () {
  console.log('Opened .osm file:', source, '\n');
});

var firstLine = true;
parser.on('writeable', function (data, callback) {
  if (firstLine) {
    firstLine = false;
    callback('[' + EOL + '  ' + JSON.stringify(data));
  } else {
    callback(',' + EOL + '  ' + JSON.stringify(data));
  }
});
parser.on('flush', function (callback) {
  callback(EOL + ']' + EOL);
});

parser.on('node', function (node, callback) {
    callback(node);
});
parser.on('way', function (way, callback) {
  callback(way);
});
parser.on('relation', function (relation, callback) {
  callback(relation);
});

parser.on('end', function () {
  console.log('Finished parsing our .osm file');
  console.log('Bytes read from incoming stream:', parser.bytesRead, 'bytes');
  console.log('Bytes written to outgoing stream:', parser.bytesWritten, 'bytes\n');

  console.log('Checking that written file is a valid JSON:', destination);

  jsonParser  = JSONStream.parse(['rows', true]);
  fs.createReadStream(destination).pipe(jsonParser);

  var isValidJSON = true;
  jsonParser.on('error', function(err){
    console.log('JSON error', err);
    isValidJSON = false;
  });
  jsonParser.on('close', function(){
    console.log('JSON file check:', (isValidJSON)?'OK' : 'ERROR');
    console.log();
  });

});