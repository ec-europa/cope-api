var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../../utils/config');
var immutable = require('immutable');

// Load articles examples and make them immutable
var testArticleData = immutable.fromJS(require('../data/articles.json'));

// Load articles schema
var articlesSchema = require('../../services/types/couchapp/lib/schemas/articles').v1;

// Load producers
var producers = require('../data/producers.json');

describe('Documents API - Articles', function articlesAPI() {
  describe('GET /beta/docs/types/articles', function getArticlesList() {
    var apiResponse;

    before(function makeRequest() {
      var requestUrl = config.baseUrl + '/beta/docs/types/articles';
      apiResponse = chakram.get(requestUrl);
      return apiResponse;
    });

    it('should return 200 on success', function test() {
      return expect(apiResponse).to.have.status(200);
    });

    it('should respond with JSON', function test() {
      return expect(apiResponse).to.have.header('content-type', 'application/json');
    });

    it('should return the list of all articles (at least 1)', function test() {
      return expect(apiResponse).to.have.schema({
        type: 'array',
        minItems: 1,
        items: {
          type: 'object'
        }
      });
    });

    describe('GET /beta/docs/types/articles/:uuid', function getArticleByUuid() {
      var getApiResponse;

      before(function makeRequest() {
        return apiResponse.then(function handleResponse(resp) {
          var uuid = resp.body[0].id;
          var uri = '/beta/docs/types/articles/' + uuid;
          var requestUrl = config.baseUrl + uri;
          getApiResponse = chakram.get(requestUrl);
          return getApiResponse;
        });
      });

      it('should return 200 on success', function test() {
        return expect(getApiResponse).to.have.status(200);
      });

      it('should respond with JSON', function test() {
        return expect(getApiResponse).to.have.header('content-type', 'application/json');
      });

      it('should return a well formatted article', function test() {
        return expect(getApiResponse).to.have.schema(articlesSchema);
      });
    });
  });

  // Get uuid of documents with key [:producer, :producer_id]
  describe('GET /beta/uuid/:producer/:producer_id', function get() {
    var apiResponse;

    // Get data from first article for the tests
    var producer = testArticleData.get(0).get('producer');
    var producerContentId = testArticleData.get(0).get('producer_content_id');

    before(function makeRequest() {
      var requestUrl = config.baseUrl + '/beta/uuid/' + producer + '/' + producerContentId;
      apiResponse = chakram.get(requestUrl);
      return apiResponse;
    });

    it('should return 200 on success', function test() {
      return expect(apiResponse).to.have.status(200);
    });

    it('should respond with JSON', function test() {
      return expect(apiResponse).to.have.header('content-type', 'application/json');
    });

    it('should return the uuid for :producer :producer_content_id', function test() {
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
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: 'string',
                key: 'array',
                value: 'string'
              },
              required: ['id', 'key', 'value']
            }
          }
        }
      });
    });
  });

  describe('POST /beta/docs/types/article ~ as producer 1', function producerTests() {
    var producerArticle;
    var producerParams = {
      auth: {
        user: producers[0].name,
        pass: producers[0].password
      }
    };

    before(function makeRequest() {
      var requestUrl = config.baseUrl + '/beta/docs/types/articles';

      // Create a dataset from original data and set producer
      var requestData = testArticleData.get(0).toJS();

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

    describe('PUT /beta/docs/types/articles ~ as producer 1', function prodPut() {
      it('can update one of my article', function test() {
        return producerArticle.then(function checkResponse(resp) {
          var requestUrl = config.baseUrl + '/beta/docs/types/articles/' + resp.body.id;

          // Create a dataset from original data
          var requestData = testArticleData.get(0).mergeDeep({
            producer: producers[0].name,
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

    describe('DELETE /beta/docs/types/articles ~ as producer 1', function prodDelete() {
      it('can delete my article with the given id', function test() {
        return producerArticle.then(function checkResponse(resp) {
          var requestUrl = config.baseUrl + '/beta/docs/types/articles/' + resp.body.id;
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


  describe('POST /beta/docs/types/article ~ as a consumer', function consumerTests() {
    var consumerArticle;

    before(function makeRequest() {
      var requestUrl = config.baseUrl + '/beta/docs/types/articles';

      // Create a dataset from original data and set producer
      var requestData = testArticleData.get(0).toJS();

      consumerArticle = chakram.post(requestUrl, requestData);
      return consumerArticle;
    });

    it('should return 401 with error', function test() {
      return expect(consumerArticle).to.have.status(401);
    });

    it('should respond with JSON', function test() {
      // Returns 'application/json, application/json'  (this is a known bug in CouchDB)
      return expect(consumerArticle).to.have.header('content-type', 'application/json');
    });

    it('should respond with "error": "unauthorized"', function test() {
      expect(consumerArticle).to.have.json('error', 'unauthorized');
    });
  });
});
