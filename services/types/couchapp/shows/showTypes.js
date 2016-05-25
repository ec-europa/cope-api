/**
 * Return a available types
 *
 * @param doc
 * @param req
 * @returns {*}
 */
(function show() {
  var schemas = [];
  var schemaLib = this.lib.schemas;
  var newType;
  var currType;
  var type;

  // "for type in schemaLib"
  for (type in schemaLib) {
    if ({}.hasOwnProperty.call(schemaLib, type)) {
      newType = require('lib/schemas/' + type);
      currType = {};
      currType[newType.v1.id] = newType.v1.version;
      schemas.push(currType);
    }
  }

  if (schemas == null) {
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
    body: JSON.stringify(schemas)
  };
});
