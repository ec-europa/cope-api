/**
 * Return a available types
 *
 * @param doc
 * @param req
 * @returns {*}
 */
function(doc, req) {

    var schemas = [];
    var schemaLib = this.lib.schemas;

    for (var type in schemaLib) {
        var newType = require('lib/schemas/' + type);
        var currType = {};
        currType[newType['v1'].id] = newType['v1'].version;
        schemas.push(currType);
    }

    if (schemas == null) {
        return {
            'json': {
                code: 404,
                error: "not_found",
                reason: "schema doesn't exist"
            }
        };
    }
    return {
        'json': schemas
    };
}
