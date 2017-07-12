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

function getSubscribers(type, producer, theme) {
  request({
    url: facade + '/beta/subscriptions/subscribers/',
    method: 'POST',
    json: {
      selector: {
        type: {
          $or: [type, { $exists: false }]
        },
        producer: {
          $or: [producer, { $exists: false }]
        },
        theme: {
          $or: [theme, { $exists: false }]
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
      // TODO for each entry ping the subscriber
    }
  });
}

function pingSubscriber(seq, endpoint, subscriptionUrl) {
  var postData = {
    seq: seq,
    subscriptionUrl: subscriptionUrl
  };

  request({
    url: endpoint,
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
}

// Trigger action on change
changes.on('readable', function handleChange() {
  // Read changes
  var change = changes.read();

  // Extract data (or do whatever you want)
  console.info('Changes captured:');
  console.info(change);

  // TODO fetch changed document and extract 'type','producer','theme'

  // Filter subscribers
  getSubscribers('news', 'prd', 'energy');

  // Mock subscriber's endpoint
  nock('http://listener.com')
    .post('/endpoint')
    .reply(202, 'SUCCESS');

  // Webhook
  console.info('Sending a ping to subscriber');
  pingSubscriber(change.seq, 'http://listener.com/endpoint', 'subscription url');
});
