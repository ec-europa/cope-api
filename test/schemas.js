var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../utils/config');

// Load schemas for comparison
var articlesSchema = require('../services/types/couchapp/lib/schemas/articles').v1;
var departmentsSchema = require('../services/types/couchapp/lib/schemas/departments').v1;

var types = {
  articles: {
    schema: articlesSchema,
    version: 'v1'
  },
  departments: {
    schema: departmentsSchema,
    version: 'v1'
  }
};

describe('Schemas API', function schemasAPI() {
  // For each available schema, repeat the same tests
  Object.keys(types).forEach(function eachKey(type) {
    var version = types[type].version;
    var uri = '/beta/schema/' + type + '/' + version;

    describe('GET ' + uri, function getArticleSchema() {
      var apiResponse;
      var requestUrl = config.baseUrl + uri;

      // Make request
      before(function makeRequest() {
        apiResponse = chakram.get(requestUrl);
        return apiResponse;
      });

      it('should return 200 on success', function test() {
        return expect(apiResponse).to.have.status(200);
      });

      it('should respond with JSON', function test() {
        return expect(apiResponse).to.have.header('content-type', 'application/json');
      });

      it('should return the schema for ' + type + ' ' + version, function test() {
        return apiResponse.then(function checkResponse(resp) {
          return expect(resp.body).to.deep.equal(types[type].schema);
        });
      });
    });
  });

  // Test with a false schema
  describe('GET /beta/schema/unknown/v1 ~ wrong request', function getUnknownSchema() {
    var apiResponse;
    var requestUrl = config.baseUrl + '/beta/schema/unknown/v1';

    // Make request
    before(function makeRequest() {
      apiResponse = chakram.get(requestUrl);
      return apiResponse;
    });

    it('should return a 404 code', function test() {
      return expect(apiResponse).to.have.status(404);
    });

    it('should respond with JSON', function test() {
      return expect(apiResponse).to.have.header('content-type', 'application/json');
    });

    it('should return the error and the reason', function test() {
      return expect(apiResponse).to.have.schema({
        type: 'object',
        properties: {
          error: {
            type: 'string'
          },
          reason: {
            type: 'string'
          }
        }
      });
    });
  });
});
