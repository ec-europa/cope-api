function schemaValidation(newDoc, schema) {
  // load the validator
  var validator = require('lib/vendor/tv4/tv4').tv4;

  var verbose = {};

  // validate newDoc against schema[version]
  if (!validator.validate(newDoc, schema)) {
    verbose.message = validator.error.message;
    verbose.params = validator.error.params;
    verbose.code = validator.error.code;

    throw new Error({
      forbidden: {
        code: 400,
        error: 'invalid document',
        reason: [verbose, newDoc]
      }
    });
  }

  if (schema == null) {
    throw new Error({
      forbidden: {
        code: 404,
        error: 'not_found',
        reason: 'schema doesn\'t exist'
      }
    });
  }
}

/**
 * Validation function applied to all documents.
 *
 * @param newDoc the document to be inserted
 * @param oldDoc the current version of the document (null in case of creation)
 * @param userCtx the current user
 */
(function validate(newDoc, oldDoc, userCtx) {
  var type = newDoc.type;
  var version = newDoc.version;
  var schema;
  var genericSchema = require('lib/schemas/generic');


  // is the user authenticated ?
  if (!userCtx.name) {
    throw new Error({
      unauthorized: 'only authenticated users can post'
    });
  }

  // onDeleted skip required fields check
  if ((newDoc.deleted_by_producer && oldDoc.producer === userCtx.name) || userCtx.name === 'admin') {
    return;
  }

  // is user owner of both revision of this document? (UPDATE)
  if (oldDoc && oldDoc.producer !== newDoc.producer) {
    throw new Error({
      unauthorized: 'You may only update your documents ' + userCtx.name
    });
  }

  // is user author of this document? (CREATE)
  if (newDoc.producer !== userCtx.name && userCtx.name !== 'admin') {
    throw new Error({
      unauthorized: 'You may only create documents under your name ' + userCtx.name
    });
  }

  // validate against generic schema
  genericSchema = genericSchema.v1;
  schemaValidation(newDoc, genericSchema);

  // newDoc needs to declare a schema to do validation
  if (!newDoc.type) {
    throw new Error({
      forbidden: 'The document schema is missing.'
    });
  }

  // newDoc needs to declare a version to do validation
  if (!newDoc.version) {
    throw new Error({
      forbidden: 'The document schema version is missing.'
    });
  }

  // newDoc.schema needs to exists
  if (!{}.hasOwnProperty.call(this.lib.schemas, type)) {
    throw new Error({
      forbidden: 'There is no schema for: ' + type
    });
  }

  schema = require('lib/schemas/' + type);

  // newDoc.schema needs to exists in the right version
  if (!schema[version]) {
    throw new Error({
      forbidden: 'There is no schema for: ' + type + ':' + version
    });
  }

  schema = schema[version];

  schemaValidation(newDoc, schema);
});
