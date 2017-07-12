/* eslint-disable no-console */
var ChangesStream = require('./changes-stream');
var nock = require('nock');
var request = require('request');

// Read environment variables
var facade = process.env.COPE_FACADE_URL;

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
  request({
    url: facade + '/beta/subscriptions/subscribers/',
    method: 'POST',
    json: {
      selector: {
        type: {
          $or: ['news', { $exists: false }]
        },
        producer: {
          $or: ['prd', { $exists: false }]
        },
        theme: {
          $or: ['energy', { $exists: false }]
        },
        endpoint: { $exists: true }
      },
      fields: ['theme', 'type', 'producer', '_id', 'consumer', 'endpoint']
    }
  }, function handleResponse(error, response, body) {
    if (error) {
      console.error(error);
    }

    if (!error) {
      console.log('Subscribers ' + response.statusCode + ' : ' + JSON.stringify(body));
    }
  });

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
