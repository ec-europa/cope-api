/**
 * Return a schema document
 *
 * @param doc
 * @param req
 * @returns {*}
 */
(function show(doc, req) {
  var type = req.query.type;
  var version = req.query.version;
  var schema;

  // schema needs to exists
  if (!this.lib.schemas.hasOwnProperty(type)) {
    return {
      code: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'not_found',
        reason: 'There is no schema for: ' + type
      })
    };
  }

  schema = require('lib/schemas/' + type);

  // schema needs to exists in the right version
  if (!schema[version]) {
    return {
      code: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'not_found',
        reason: 'There is no schema for: ' + type + ':' + version
      })
    };
  }
  schema = schema[version];

  if (schema == null) {
    return {
      code: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'not_found',
        reason: 'schema doesn\'t exist'
      })
    };
  }

  return {
    code: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(schema)
  };
});
