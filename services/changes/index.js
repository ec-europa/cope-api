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

function getChangedDocument(change) {
  console.log('Get changed document :', change.id);
  return new Promise(function (success, failure) {
    request({
      url: facade + '/beta/docs/' + change.id,
      method: 'GET'
    }, function handleResponse(error, response, body) {
      if (error) {
        console.error('problem!!! ', error);
        failure(error);
      }

      if (!error) {
        body = JSON.parse(body);
        console.log('Extract changed type : ', body.type, body.producer, body.theme);
        success({
          seq: change.seq,
          type: body.type,
          producer: body.producer,
          theme: body.theme
        });
      }
    });
  });
}

function getSubscribers(params) {
  return new Promise(function (success, failure) {
    var req = {
      selector: {
        endpoint: { $exists: true }
      },
      fields: ['_id', 'consumer', 'endpoint']
    };

    if (params.type) {
      req.selector.type = {
        $or: [params.type, { $exists: false }]
      };
    }

    if (params.producer) {
      req.selector.producer = {
        $or: [params.producer, { $exists: false }]
      };
    }

    if (params.theme) {
      req.selector.theme = {
        $or: [params.theme, { $exists: false }]
      };
    }

    request({
      url: facade + '/beta/subscriptions/subscribers/',
      method: 'POST',
      json: req
    }, function handleResponse(error, response, body) {
      if (error) {
        console.error('problem!!! ', error);
        failure(error);
      }

      if (!error) {
        console.log('Get subscribers list : ', JSON.stringify(body.docs));
        success({
          docs: body.docs,
          seq: params.seq
        });
      }
    });
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

function pingSubscribers(params) {
  params.docs.forEach(function (doc) {
    // Mock subscriber's endpoint
    nock('http://listener.com')
      .post('/endpoint')
      .reply(202, 'SUCCESS');

    // Webhook
    console.info('Ping subscriber : ', doc.consumer);
    pingSubscriber(params.seq, 'http://listener.com/endpoint', doc._id);
  });
}

// Trigger action on change
changes.on('readable', function handleChange() {
  // Read changes
  var change = changes.read();

  // Extract data (or do whatever you want)
  console.info('Changes captured:', change.id);

  // TODO fetch changed document and extract 'type','producer','theme'
  getChangedDocument(change)
    .then(getSubscribers)
    .then(pingSubscribers);
});
