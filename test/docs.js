var chakram = require('chakram');
var expect = chakram.expect;
var config = require('../utils/config');

describe('Documentation', function changesAPI() {
  // Prepare requests URIs
  var docUri = '/beta';
  var stylesheetUri = '/beta/static/api.css';
  var javascriptUri = '/beta/static/api.js';

  describe('GET ' + docUri, function getHTML() {
    var apiResponse;

    before(function makeRequest() {
      var requestUrl = config.baseUrl + docUri;
      apiResponse = chakram.get(requestUrl, {
        headers: {
          Accept: 'text/html'
        }
      });
    });

    it('should return 200', function test() {
      return expect(apiResponse).to.have.status(200);
    });

    it('should respond with HTML', function test() {
      return expect(apiResponse).to.have.header('content-type', 'text/html; charset=utf-8');
    });
  });

  describe('GET ' + stylesheetUri, function getCSS() {
    var apiResponse;

    before(function makeRequest() {
      var requestUrl = config.baseUrl + stylesheetUri;
      apiResponse = chakram.get(requestUrl);
    });

    it('should return 200', function test() {
      return expect(apiResponse).to.have.status(200);
    });

    it('should respond with CSS', function test() {
      return expect(apiResponse).to.have.header('content-type', 'text/css');
    });
  });

  describe('GET ' + javascriptUri, function getJS() {
    var apiResponse;

    before(function makeRequest() {
      var requestUrl = config.baseUrl + javascriptUri;
      apiResponse = chakram.get(requestUrl);
    });

    it('should return 200', function test() {
      return expect(apiResponse).to.have.status(200);
    });

    it('should respond with JavaScript', function test() {
      return expect(apiResponse).to.have.header('content-type', 'application/javascript');
    });
  });
});
