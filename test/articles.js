var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../utils/config');
var immutable = require('immutable');

// Load article example and make it immutable
var testArticleData = immutable.fromJS(require('./data/article.json'));

describe('Articles API', function articlesAPI() {
  var articlePost;

  before(function prepareTests() {
    var requestUrl = config.baseUrl + '/beta/docs/types/article';
    var requestParams = {
      auth: {
        user: config.admin.username,
        pass: config.admin.password
      }
    };

    // Create a dataset from original data and set producer
    var requestData = testArticleData.set('producer', config.tests.producer.username).toJS();

    articlePost = chakram.post(requestUrl, requestData, requestParams);
    return articlePost;
  });

  describe('POST /beta/docs/types/article (as a producer)', function producerTests() {
    var producerArticle;
    var producerParams = {
      auth: {
        user: config.tests.producer.username,
        pass: config.tests.producer.password
      }
    };

    before(function makeRequest() {
      var requestUrl = config.baseUrl + '/beta/docs/types/article';

      // Create a dataset from original data and set producer
      var requestData = testArticleData.set('producer', config.tests.producer.username).toJS();

      producerArticle = chakram.post(requestUrl, requestData, producerParams);
      return producerArticle;
    });

    it('should return 201 on success', function test() {
      return expect(producerArticle).to.have.status(201);
    });

    it('should respond with JSON', function test() {
      // Returns 'application/json, application/json'  (this is a known bug in CouchDB)
      return expect(producerArticle).to.have.header('content-type', 'application/json');
    });

    it('should respond with "ok": "true"', function test() {
      return expect(producerArticle).to.have.json('ok', true);
    });

    it('should have the right schema', function test() {
      return expect(producerArticle).to.have.schema({
        type: 'object',
        required: ['id']
      });
    });

    describe('PUT /beta/docs/types/article (as a producer)', function prodPut() {
      it('can update one of my article', function test() {
        return producerArticle.then(function checkResponse(resp) {
          var requestUrl = config.baseUrl + '/beta/docs/types/article/' + resp.body.id;

          // Create a dataset from original data
          var requestData = testArticleData.mergeDeep({
            producer: config.tests.producer.username,
            fields: {
              title: {
                en: ['New title'],
                fr: ['Nouveau titre']
              }
            }
          }).toJS();

          var apiResponse = chakram.put(requestUrl, requestData, producerParams);

          return expect(apiResponse).to.have.status(200);
        });
      });
    });

    describe('DELETE /beta/docs/types/article (as a producer)', function prodDelete() {
      it('can delete my article with the given id', function test() {
        return producerArticle.then(function checkResponse(resp) {
          var requestUrl = config.baseUrl + '/beta/docs/types/article/' + resp.body.id;
          var apiResponse = chakram.delete(requestUrl, null, producerParams);

          expect(apiResponse).to.have.status(200);
          expect(apiResponse).to.have.schema({
            type: 'object',
            properties: {
              ok: {
                type: 'boolean'
              },
              id: {
                type: 'string',
                pattern: '^[0-9A-Za-z-_]*$'
              }
            },
            required: [
              'ok',
              'id'
            ]
          });

          return chakram.wait();
        });
      });
    });
  });

  describe('As a consumer, I', function consumerTests() {
    var consumerResponse;

    before('Preparing the POST request', function test() {
      // Create a dataset from original data and set producer
      var requestData = testArticleData.set('producer', config.tests.producer.username).toJS();
      var requestUrl = config.baseUrl + '/beta/docs/types/article';
      consumerResponse = chakram.post(requestUrl, requestData);
      return consumerResponse;
    });

    it('can\'t post an article', function test() {
      expect(consumerResponse).to.have.status(401);
      // Returns 'application/json, application/json'  (this is a known bug in CouchDB)
      expect(consumerResponse).to.have.header('content-type', 'application/json');
      expect(consumerResponse).to.have.json('error', 'unauthorized');

      return chakram.wait();
    });
  });

  describe('GET Article', function get() {
    it('should return a specific article', function test() {
      return articlePost.then(function checkResponse(resp) {
        var requestUrl = config.baseUrl + '/beta/docs/types/article/' + resp.body.id;
        var apiResponse = chakram.get(requestUrl);

        return expect(apiResponse).to.have.status(200);
      });
    });

    it('should return the list of types', function test() {
      var requestUrl = config.baseUrl + '/beta/types';
      var apiResponse = chakram.get(requestUrl);

      // The following won't work (this is a CouchDB issue)
      // expect(apiResponse).to.have.header('content-type', 'application/json');

      expect(apiResponse).to.have.schema({
        type: 'array',
        items: {
          type: 'object',
          patternProperties: {
            '^[a-z_]*$': {
              type: 'string'
            }
          }
        }
      });

      return chakram.wait();
    });


    it('should return the uuid for :producer :producer_content_id', function test() {
      var requestUrl = config.baseUrl + '/beta/uuid/' + config.tests.producer + '/123';
      var apiResponse = chakram.get(requestUrl);

      return expect(apiResponse).to.have.schema({
        type: 'object',
        properties: {
          total_rows: {
            type: 'number'
          },
          offset: {
            type: 'number'
          },
          rows: {
            type: 'array'
          }
        }
      });
    });

    it('should return the list of articles', function test() {
      var requestUrl = config.baseUrl + '/beta/docs/types/article';
      var apiResponse = chakram.get(requestUrl);

      return expect(apiResponse).to.have.schema({
        type: 'array'
      });
    });

    it('should get all the change from :producer', function test() {
      var requestUrl = config.baseUrl + '/beta/changes/articles/' + config.tests.producer;
      var apiResponse = chakram.get(requestUrl);

      return expect(apiResponse).to.have.schema({
        type: 'object',
        properties: {
          results: {
            type: 'array'
          },
          last_seq: {
            type: 'number'
          }
        }
      });
    });
  });
});
