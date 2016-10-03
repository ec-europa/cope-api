var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../../utils/config');
var immutable = require('immutable');

// Load sample data and make them immutable
var testNewsData = immutable.fromJS(require('../data/news.json'));
var testDepartmentsData = immutable.fromJS(require('../data/departments.json'));

// Load schemas
var newsSchema = require('../../services/types/couchapp/lib/schemas/news').v1;
var departmentsSchema = require('../../services/types/couchapp/lib/schemas/departments').v1;

// Load producers
var producers = require('../data/producers.json');

var types = {
  departments: {
    schema: departmentsSchema,
    version: 'v1',
    data: testDepartmentsData
  },
  news: {
    schema: newsSchema,
    version: 'v1',
    data: testNewsData
  }
};

Object.keys(types).forEach(function eachType(type) {
  describe('Documents API - ' + type, function typeAPI() {
    describe('GET /beta/docs/types/' + type, function getTypeList() {
      var apiResponse;

      before(function makeRequest() {
        var requestUrl = config.baseUrl + '/beta/docs/types/' + type;
        apiResponse = chakram.get(requestUrl);
        return apiResponse;
      });

      it('should return 200 on success', function test() {
        return expect(apiResponse).to.have.status(200);
      });

      it('should respond with JSON', function test() {
        return expect(apiResponse).to.have.header('content-type', 'application/json');
      });

      it('should return the list of all ' + type + ' (at least 1)', function test() {
        return expect(apiResponse).to.have.schema({
          type: 'object',
          properties: {
            rows: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object'
              }
            }
          }
        });
      });

      describe('GET /beta/docs/types/' + type + '/:uuid', function getTypeByUuid() {
        var getApiResponse;

        before(function makeRequest() {
          return apiResponse.then(function handleResponse(resp) {
            var uuid = resp.body.rows[0].id;
            var uri = '/beta/docs/types/' + type + '/' + uuid;
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

        it('should return a well formatted ' + type, function test() {
          chakram.addSchema(types[type].schema);
          return expect(getApiResponse).to.have.schema(types[type].schema);
        });
      });
    });

  // Get uuid of documents with key [:producer, :producer_id]
    describe('GET /beta/uuid/:producer/:producer_id', function get() {
      var apiResponse;

    // Get data from first type for the tests
      var producer = types[type].data.get(0).get('producer');
      var producerContentId = types[type].data.get(0).get('producer_content_id');

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

    describe('POST /beta/docs/types/' + type + ' ~ as producer 1', function producerTests() {
      var producerType;
      var producerParams = {
        auth: {
          user: producers[0].name,
          pass: producers[0].password
        }
      };

      before(function makeRequest() {
        var requestUrl = config.baseUrl + '/beta/docs/types/' + type;

      // Create a dataset from original data and set producer
        var requestData = types[type].data.get(0).toJS();

        producerType = chakram.post(requestUrl, requestData, producerParams);
        return producerType;
      });

      it('should return 201 on success', function test() {
        return expect(producerType).to.have.status(201);
      });

      it('should respond with JSON', function test() {
      // Returns 'application/json, application/json'  (this is a known bug in CouchDB)
        return expect(producerType).to.have.header('content-type', 'application/json');
      });

      it('should respond with "ok": "true"', function test() {
        return expect(producerType).to.have.json('ok', true);
      });

      it('should have the right schema', function test() {
        return expect(producerType).to.have.schema({
          type: 'object',
          required: ['id']
        });
      });

      describe('PUT /beta/docs/types/' + type + ' ~ as producer 1', function prodPut() {
        var apiResponse;

        before(function makeRequest() {
          return producerType.then(function checkResponse(resp) {
            var requestUrl = config.baseUrl + '/beta/docs/types/' + type + '/' + resp.body.id;

          // Create a dataset from original data
            var requestData = types[type].data.get(0).mergeDeep({
              producer: producers[0].name,
              fields: {
                title: {
                  en: ['New title'],
                  fr: ['Nouveau titre']
                }
              }
            }).toJS();

            apiResponse = chakram.put(requestUrl, requestData, producerParams);
            return apiResponse;
          });
        });

        it('should return 201 on success', function test() {
          return expect(apiResponse).to.have.status(201);
        });

        it('should respond with JSON', function test() {
        // Returns 'application/json, application/json'  (this is a known bug in CouchDB)
          return expect(apiResponse).to.have.header('content-type', 'application/json');
        });
      });

      describe('DELETE /beta/docs/types/' + type + ' ~ as producer 1', function prodDelete() {
        var apiResponse;
        before(function makeRequest() {
          return producerType.then(function checkResponse(resp) {
            var requestUrl = config.baseUrl + '/beta/docs/types/' + type + '/' + resp.body.id;
            apiResponse = chakram.delete(requestUrl, null, producerParams);
          });
        });

        it('should return 200 on success', function test() {
          return expect(apiResponse).to.have.status(200);
        });

        it('should respond with JSON', function test() {
        // Returns 'application/json, application/json'  (this is a known bug in CouchDB)
          return expect(apiResponse).to.have.header('content-type', 'application/json');
        });

        it('should respond with right format', function test() {
          return expect(apiResponse).to.have.schema({
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
        });
      });
    });

    describe('POST /beta/docs/types/' + type + ' ~ as a consumer', function consumerTests() {
      var consumerType;

      before(function makeRequest() {
        var requestUrl = config.baseUrl + '/beta/docs/types/' + type;

      // Create a dataset from original data and set producer
        var requestData = types[type].data.get(0).toJS();

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
  });
});
