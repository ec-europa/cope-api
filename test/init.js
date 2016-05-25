var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../utils/config');

// Load articles and producers
var articles = require('./data/articles.json');
var producers = require('./data/producers.json');

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

  it('should create test articles', function createArticles() {
    var requestUrl = config.baseUrl + '/beta/docs/types/article';
    var multipleResponses = [];

    articles.forEach(function postProducer(article) {
      multipleResponses.push(chakram.post(requestUrl, article, requestParams));
    });

    return chakram.all(multipleResponses).then(function handleResponses(responses) {
      var returnedStatuses = responses.map(function mapResponse(response) {
        return response.response.statusCode === 201;
      });

      return expect(returnedStatuses).to.not.include(false);
    });
  });
});
