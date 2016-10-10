var ChangesStream = require('./changes-stream');
var config = require('../../utils/config');
var nock = require('nock');
var request = require('request');

// Connect to CouchDB's changes feed
var changes = new ChangesStream(config.database);

// Trigger action on change
changes.on('readable', function () {
  // Read changes
  var change = changes.read();

  // Extract data (or do whatever you want)
  console.info('Changes captured:');
  console.info(change);

  // Filter subscribers
  // ...

  // Mock subscriber's endpoint
  var subscriber = nock('http://listener.com')
    .post('/endpoint')
    .reply(202, 'SUCCESS');

  // Webhook
  var postData = {
    seq: change.seq
  };

  console.info('Sending a ping to subscriber');

  request({
    url: 'http://listener.com/endpoint',
    method: 'POST',
    json: postData
  }, function (error, response, body) {
    if (error) {
      console.error(error);
    }

    if (!error) {
      console.log('Subscriber responded with ' + response.statusCode + ' : ' + body);
    }
  });
});
