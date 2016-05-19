var chakram = require('chakram'),
    expect = chakram.expect,
    fs = require('fs'),
    defaults = require('lodash/defaults'),
    config = require('../utils/config');

chakram.setRequestDefaults({
    auth: {
        user: config.username,
        pass: config.password,
    }
});

describe("Articles API", function() {

    var articlePost;

    before("Initializing a new article for the tests", function() {
        var initialArticleData = require('./data/article.json');
        articlePost = chakram.post(config.database, initialArticleData);
        return articlePost;
    });

    describe("POST Article", function() {

        it("should return 201 on success", function() {
            return expect(articlePost).to.have.status(201);
        });

        it("should respond with JSON", function () {
            return expect(articlePost).to.have.header('content-type', 'application/json');
        });

        it("should return a body with 'ok' set to true", function() {
            return expect(articlePost).to.have.json("ok", true);
        });


        it("should specify the id and revision of the new article", function() {
            return expect(articlePost).to.have.schema({
                "type": "object",
                "required": [
                    "id",
                    "rev"
                ]
            });
        });

    });

    describe("GET Article", function() {
        it("should return the list of types", function() {
            var apiResponse = chakram.get(config.database + '/_design/facade/_rewrite/beta/types');

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
            var url = config.database + '/_design/facade/_rewrite/beta/uuid/someproducer/123';
            var apiResponse = chakram.get(url);

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
    });

    describe("DELETE Article", function() {
        it("should delete the article with the given id", function() {
            return articlePost.then(function(resp) {
                var url = config.database + '/_design/facade/_rewrite/beta/docs/types/article/' + resp.body.id;
                var apiResponse = chakram.delete(url);

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
