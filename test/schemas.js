var chakram = require('chakram'),
    expect = chakram.expect,
    config = require('../utils/config');

chakram.setRequestDefaults({
    auth: {
        user: config.admin.username,
        pass: config.admin.password,
    }
});

describe("Schemas API", function() {
    it("should return the schema for article v1", function() {
        var requestUrl = config.baseUrl + '/beta/schema/article/v1';
        var apiResponse = chakram.get(requestUrl);

        return apiResponse.then(function(resp) {
            return expect(resp.body).to.deep.equal(require('../services/types/couchapp/lib/schemas/article').v1);
        });
    });

    it("should return the schema for departments v1", function() {
        var requestUrl = config.baseUrl + '/beta/schema/departments/v1';
        var apiResponse = chakram.get(requestUrl);

        return apiResponse.then(function(resp) {
            return expect(resp.body).to.deep.equal(require('../services/types/couchapp/lib/schemas/departments').v1);
        });
    });
});
