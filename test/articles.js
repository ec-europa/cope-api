var chakram = require('chakram'),
    expect = chakram.expect,
    config = require('../utils/config');

chakram.setRequestDefaults({
    auth: {
        user: config.admin.username,
        pass: config.admin.password,
    }
});

describe("Articles API", function() {

    var articlePost;

    before("Initializing a new article for the tests", function() {
        var data = require('./data/article.json');
        data.producer = config.tests.producer;
        var requestUrl = config.baseUrl + '/beta/docs/types/article';
        articlePost = chakram.post(requestUrl, data);
        return articlePost;
    });

    describe("POST Article", function() {

        it("should return 201 on success", function() {
            return expect(articlePost).to.have.status(201);
        });

        it("should respond with JSON", function () {
            // Returns 'application/json, application/json'  (this is a known bug in CouchDB)
            return expect(articlePost).to.have.header('content-type', 'application/json, application/json');
        });

        it("should return a body with 'ok' set to true", function() {
            return expect(articlePost).to.have.json("ok", true);
        });


        it("should specify the id of the new article", function() {
            return expect(articlePost).to.have.schema({
                "type": "object",
                "required": [
                    "id"
                ]
            });
        });

    });

    describe("GET Article", function() {
        it("should return a specific article", function() {
            return articlePost.then(function(resp) {
                var requestUrl = config.baseUrl + '/beta/docs/types/article/' + resp.body.id;
                var apiResponse = chakram.get(requestUrl);

                return expect(apiResponse).to.have.status(200);
            });
        });

        it("should return the list of types", function() {
            var requestUrl = config.baseUrl + '/beta/types';
            var apiResponse = chakram.get(requestUrl);

            // The following won't work (this is a CouchDB issue)
            // expect(apiResponse).to.have.header('content-type', 'application/json');

            expect(apiResponse).to.have.schema({
                "type": "array",
                "items": {
                    "type": "object",
                    "patternProperties": {
                        "^[a-z_]*$": {
                            "type": "string"
                        }
                    }
                }
            });

            return chakram.wait();
        });


        it("should return the uuid for :producer :producer_content_id", function() {
            var requestUrl = config.baseUrl + '/beta/uuid/' + config.tests.producer + '/123';
            var apiResponse = chakram.get(requestUrl);

            return expect(apiResponse).to.have.schema({
                "type": "object",
                "properties": {
                    "total_rows": {
                        "type": "number"
                    },
                    "offset": {
                        "type": "number"
                    },
                    "rows": {
                        "type": "array"
                    }
                }
            });
        });

        it("should return the list of articles", function() {
            var requestUrl = config.baseUrl + '/beta/docs/types/article';
            var apiResponse = chakram.get(requestUrl);

            return expect(apiResponse).to.have.schema({
                "type": "array"
            });
        });

        it("should get all the change from :producer", function() {
            var requestUrl = config.baseUrl + '/beta/changes/articles/' + config.tests.producer;
            var apiResponse = chakram.get(requestUrl);

            return expect(apiResponse).to.have.schema({
                "type": "object",
                "properties": {
                    "results": {
                        "type": "array"
                    },
                    "last_seq": {
                        "type": "number"
                    }
                }
            });
        });
    });

    describe("PUT Article", function() {
        it("should partially update the article", function() {
            return articlePost.then(function(resp) {
                var requestUrl = config.baseUrl + '/beta/docs/types/article/' + resp.body.id;
                var data = require('./data/article.json');

                data.fields.title = {
                    "en": ["New title"],
                    "fr": ["Nouveau titre"]
                };

                var apiResponse = chakram.put(requestUrl, data);

                return expect(apiResponse).to.have.status(200);
            });
        });
    });

    describe("DELETE Article", function() {
        it("should delete the article with the given id", function() {
            return articlePost.then(function(resp) {
                var requestUrl = config.baseUrl + '/beta/docs/types/article/' + resp.body.id;
                var apiResponse = chakram.delete(requestUrl);

                expect(apiResponse).to.have.status(200);
                expect(apiResponse).to.have.schema({
                    "type": "object",
                    "properties": {
                        "ok": {
                            "type": "boolean"
                        },
                        "id": {
                            "type": "string",
                            "pattern": "^[0-9A-Za-z-_]*$"
                        }
                    },
                    "required": [
                        "ok",
                        "id"
                    ]
                });

                return chakram.wait();
            })
        });
    });
});
