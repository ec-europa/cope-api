var chakram = require('chakram'),
    expect = chakram.expect,
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
        initialArticleData.producer = config.username;
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
        it("should return a specific article", function() {
            return articlePost.then(function(resp) {
                var url = config.database + '/_design/facade/_rewrite/beta/docs/types/article/' + resp.body.id;
                var apiResponse = chakram.get(url);

                return expect(apiResponse).to.have.status(200);
            });
        });

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
            var url = config.database + '/_design/facade/_rewrite/beta/uuid/' + config.username + '/123';
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

        it("should return the list of articles", function() {
            var url = config.database + '/_design/facade/_rewrite/beta/docs/types/article';
            var apiResponse = chakram.get(url);

            return expect(apiResponse).to.have.schema({
                "type": "array"
            });
        });

        it("should get all the change from :producer", function() {
            var url = config.database + '/_design/facade/_rewrite/beta/changes/articles/' + config.username;
            var apiResponse = chakram.get(url);

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
                var url = config.database + '/_design/facade/_rewrite/beta/docs/types/article/' + resp.body.id;
                var data = require('./data/article.json');

                data.fields.title = {
                    "en": ["New title"],
                    "fr": ["Nouveau titre"]
                };

                var apiResponse = chakram.put(url, data);

                return expect(apiResponse).to.have.status(200);
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

describe("Schemas API", function() {
    it("should return the schema for :schema :version", function() {
        var url = config.database + '/_design/facade/_rewrite/beta/schema/article/v1';
        var apiResponse = chakram.get(url);

        return apiResponse.then(function(resp) {
            console.log(resp.body);
            return expect(resp.body).to.deep.equal(require('../services/types/couchapp/lib/schemas/article').v1);
        });
    });
});
