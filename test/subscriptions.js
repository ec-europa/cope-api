var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../utils/config');

// Load sample data
var testSubscriptionsData = require('./data/subscriptions.json');

// Load consumers
var consumers = require('./data/consumers.json'); // TODO consider all of them as users

describe('Subscriptions API', function schemasAPI() {
  describe('POST /beta/subscriptions/ ~ as anonymous', function consumerTests() {
    var consumerType;

    before(function makeRequest() {
      var requestUrl = config.baseUrl + '/beta/subscriptions/';

      // Create a dataset from original data and set producer
      var requestData = testSubscriptionsData[0];

      consumerType = chakram.post(requestUrl, requestData);
      return consumerType;
    });

    it('should return 401 with error', function test() {
      return expect(consumerType).to.have.status(401);
    });

    it('should respond with JSON', function test() {
      // Returns 'application/json, application/json'  (this is a known bug in CouchDB)
      return expect(consumerType).to.have.header('content-type', 'application/json');
    });

    it('should respond with "error": "unauthorized"', function test() {
      expect(consumerType).to.have.json('error', 'unauthorized');
    });
  });

  describe('POST /beta/subscriptions/ ~ as a consumer', function consumerTests() {
    var consumerType;

    before(function makeRequest() {
      var requestUrl = config.baseUrl + '/beta/subscriptions/';
      var consumerParams = {
        auth: {
          user: consumers[0].name,
          pass: consumers[0].password
        }
      };

      // Create a dataset from original data and set producer
      var requestData = testSubscriptionsData[0];

      consumerType = chakram.post(requestUrl, requestData, consumerParams);
      return consumerType;
    });


    it('should return 201 on success', function test() {
      return expect(consumerType).to.have.status(201);
    });

    it('should respond with JSON', function test() {
      // Returns 'application/json, application/json'  (this is a known bug in CouchDB)
      return expect(consumerType).to.have.header('content-type', 'application/json');
    });

    it('should respond with "ok": "true"', function test() {
      return expect(consumerType).to.have.json('ok', true);
    });
  });

  describe('GET /beta/subscriptions/consumer/' + consumers[0].name + ' ~ as a consumer', function changesAPI() {
    // Prepare requests URIs
    var docUri = '/beta/subscriptions/consumer/' + consumers[0].name;

    var apiResponse;

    before(function makeRequest() {
      var requestUrl = config.baseUrl + docUri;
      apiResponse = chakram.get(requestUrl, {
        headers: {
          Accept: 'application/json'
        }
      });
    });

    it('should return 200', function test() {
      return expect(apiResponse).to.have.status(200);
    });
  });
});
