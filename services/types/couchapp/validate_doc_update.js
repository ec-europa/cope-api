/**
 * Validation function applied to all documents.
 *
 * @param newDoc the document to be inserted
 * @param oldDoc the current version of the document (null in case of creation)
 * @param userCtx the current user
 */
function(newDoc, oldDoc, userCtx) {

    var type = newDoc.type;
    var version = newDoc.version;
    var schema;

    function schema_validation(newDoc, schema) {

        // validate newDoc against schema[version]
        if (!validator.validate(newDoc, schema)) {

            var verbose = {};
            verbose.message = validator.error.message;
            verbose.params = validator.error.params;
            verbose.code = validator.error.code;

            throw ({
                forbidden: {
                    code: 400,
                    error: "invalid document",
                    reason: [verbose, newDoc]
                }
            });
        }

        if (schema == null) {
            throw ({
                forbidden: {
                    code: 404,
                    error: "not_found",
                    reason: "schema doesn't exist"
                }
            });
        }

    }

    //is the user authenticated ?
    if (!userCtx.name) {
        throw ({
            unauthorized: "only authenticated users can post"
        });
    }

    //onDeleted skip required fields check
    if (newDoc.deleted_by_producer && oldDoc.producer == userCtx.name || userCtx.name == "admin") {
        return;
    }

    //is user owner of both revision of this document? (UPDATE)
    if (oldDoc && oldDoc.producer != newDoc.producer) {
        throw ({
            unauthorized: "You may only update your documents " + userCtx.name
        })
    }

    //is user author of this document? (CREATE)
    if (newDoc.producer != userCtx.name && userCtx.name != "admin") {
        throw ({
            unauthorized: "You may only create documents under your name " + userCtx.name
        });
    }

    // load the validator
    var validator = require('lib/vendor/tv4/tv4').tv4;

    // validate against generic schema
    var generic_schema = require('lib/schemas/generic');
    generic_schema = generic_schema["v1"];
    schema_validation(newDoc, generic_schema);

    // newDoc needs to declare a schema to do validation
    if (!newDoc.type) {
        throw ({
            forbidden: 'The document schema is missing.'
        });
    }

    // newDoc needs to declare a version to do validation
    if (!newDoc.version) {
        throw ({
            forbidden: 'The document schema version is missing.'
        });
    }

    // newDoc.schema needs to exists
    if (!this.lib.schemas.hasOwnProperty(type)) {
        throw ({
            forbidden: 'There is no schema for: ' + type
        });
    }
    schema = require('lib/schemas/' + type);

    // newDoc.schema needs to exists in the right version
    if (!schema[version]) {
        throw ({
            forbidden: 'There is no schema for: ' + type + ':' + version
        });
    }
    schema = schema[version];

    schema_validation(newDoc, schema);

}
