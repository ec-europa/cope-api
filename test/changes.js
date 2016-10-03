var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../utils/config');

// Load producers
var producers = require('./data/producers.json');

describe('Changes API', function changesAPI() {
  // Prepare request URI
  var type = 'news';
  var producer = producers[0].name;
  var uri = '/beta/changes/types/' + type + '/producers/' + producer;

  describe('GET ' + uri, function getChangesByProducerUuid() {
    var apiResponse;

    before(function makeRequest() {
      var requestUrl = config.baseUrl + uri;
      apiResponse = chakram.get(requestUrl);
    });

    it('should return 200 on success', function test() {
      return expect(apiResponse).to.have.status(200);
    });

    it('should respond with JSON', function test() {
      return expect(apiResponse).to.have.header('content-type', 'application/json');
    });

    it('should get all the change from :producer', function test() {
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
