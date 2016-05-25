var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../utils/config');

// Load schemas for comparison
var articleSchema = require('../services/types/couchapp/lib/schemas/article').v1;
var departmentsSchema = require('../services/types/couchapp/lib/schemas/departments').v1;

describe('Schemas API', function schemasAPI() {
  describe('GET /beta/schema/article/v1', function getArticleSchema() {
    var apiResponse;
    var requestUrl = config.baseUrl + '/beta/schema/article/v1';

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

    it('should return the schema for article v1', function test() {
      return apiResponse.then(function checkResponse(resp) {
        return expect(resp.body).to.deep.equal(articleSchema);
      });
    });
  });

  describe('GET /beta/schema/departments/v1', function getDepartmentsSchema() {
    var apiResponse;
    var requestUrl = config.baseUrl + '/beta/schema/departments/v1';

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

    it('should return the schema for departments v1', function test() {
      return apiResponse.then(function checkResponse(resp) {
        return expect(resp.body).to.deep.equal(departmentsSchema);
      });
    });
  });

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
