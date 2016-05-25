var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../utils/config');

describe('Types API', function typesAPI() {
  describe('GET /beta/types', function getTypes() {
    var apiResponse;

    before(function makeRequest() {
      var requestUrl = config.baseUrl + '/beta/types';
      apiResponse = chakram.get(requestUrl);
    });

    it('should return 200 on success', function test() {
      return expect(apiResponse).to.have.status(200);
    });

    it('should respond with JSON', function test() {
      return expect(apiResponse).to.have.header('content-type', 'application/json');
    });

    it('should return the list of types', function test() {
      return expect(apiResponse).to.have.schema({
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
    });
  });
});
