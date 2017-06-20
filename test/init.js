var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../utils/config');

// Load data
var news = require('./data/news.json');
var departments = require('./data/departments.json');
var producers = require('./data/producers.json');
var consumers = require('./data/consumers.json');

describe('Prepare tests', function init() {
  var requestParams = {
    auth: {
      user: config.admin.username,
      pass: config.admin.password
    }
  };

  it('should create producers', function createProducers() {
    var requestUrl = config.host + '/_users';
    var multipleResponses = [];

    producers.forEach(function postProducer(producer) {
      multipleResponses.push(chakram.post(requestUrl, producer, requestParams));
    });

    return chakram.all(multipleResponses).then(function handleResponses(responses) {
      var returnedStatuses = responses.map(function mapResponse(response) {
        // 201: created, 409: conflict (already exists)
        return response.response.statusCode === 201 || response.response.statusCode === 409;
      });

      return expect(returnedStatuses).to.not.include(false);
    });
  });

  it('should create consumers', function createConsumers() {
    var requestUrl = config.host + '/_users';
    var multipleResponses = [];

    consumers.forEach(function postConsumers(consumer) {
      multipleResponses.push(chakram.post(requestUrl, consumer, requestParams));
    });

    return chakram.all(multipleResponses).then(function handleResponses(responses) {
      var returnedStatuses = responses.map(function mapResponse(response) {
        // 201: created, 409: conflict (already exists)
        return response.response.statusCode === 201 || response.response.statusCode === 409;
      });

      return expect(returnedStatuses).to.not.include(false);
    });
  });


  it('should create test news', function createNews() {
    var requestUrl = config.baseUrl + '/beta/docs/types/news';
    var multipleResponses = [];

    news.forEach(function postProducer(newsItem) {
      multipleResponses.push(chakram.post(requestUrl, newsItem, requestParams));
    });

    return chakram.all(multipleResponses).then(function handleResponses(responses) {
      var returnedStatuses = responses.map(function mapResponse(response) {
        return response.response.statusCode === 201;
      });

      return expect(returnedStatuses).to.not.include(false);
    });
  });

  it('should create test departments', function createDepartments() {
    var requestUrl = config.baseUrl + '/beta/docs/types/departments';
    var multipleResponses = [];

    departments.forEach(function postProducer(department) {
      multipleResponses.push(chakram.post(requestUrl, department, requestParams));
    });

    return chakram.all(multipleResponses).then(function handleResponses(responses) {
      var returnedStatuses = responses.map(function mapResponse(response) {
        return response.response.statusCode === 201;
      });

      return expect(returnedStatuses).to.not.include(false);
    });
  });
});
