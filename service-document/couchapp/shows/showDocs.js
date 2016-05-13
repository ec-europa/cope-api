/**
 * Return a filtered version of document
 *
 * @param doc
 * @param req
 * @returns {*}
 */
function(doc, req) {

    if (doc == null) {
        return {
            'json': {
                code: 404,
                error: "not_found",
                reason: "document doesn't exist"
            }
        };
    }

    if (doc.deleted_by_producer) {
        return {
            'json': {
                code: 404,
                "error": "not_found",
                "reason": "deleted"
            }
        };
    }

    var newDoc = {};
    newDoc._id = doc._id;
    newDoc.created = doc.created;
    newDoc.updated = doc.updated;
    newDoc.default_language = doc.default_language;
    newDoc.languages = doc.languages;
    newDoc.fields = doc.fields;

    return {
        'json': newDoc
    };
}
