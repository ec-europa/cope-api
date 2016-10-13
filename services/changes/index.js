/* eslint-disable no-console */
var ChangesStream = require('./changes-stream');
var nock = require('nock');
var request = require('request');

// Read environment variables
var facade = process.env.FACADE;

// Connect to CouchDB's changes feed
var changes = new ChangesStream({
  db: facade + '/beta/changes'
});

// Trigger action on change
changes.on('readable', function handleChange() {
  // Read changes
  var change = changes.read();
  var postData;

  // Extract data (or do whatever you want)
  console.info('Changes captured:');
  console.info(change);

  // Filter subscribers
  // ...

  // Mock subscriber's endpoint
  nock('http://listener.com')
    .post('/endpoint')
    .reply(202, 'SUCCESS');

  // Webhook
  postData = {
    seq: change.seq
  };

  console.info('Sending a ping to subscriber');

  request({
    url: 'http://listener.com/endpoint',
    method: 'POST',
    json: postData
  }, function handleResponse(error, response, body) {
    if (error) {
      console.error(error);
    }

    if (!error) {
      console.log('Subscriber responded with ' + response.statusCode + ' : ' + body);
    }
  });
});
