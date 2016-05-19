/**
 * View returning the language coverage for a given origin
 *
 * @param {string} origin.
 *
 * @type {{map: Function}}
 */
function(doc) {
    if (doc.producer && doc.producer_content_id && !doc.deleted_by_producer && doc.fields.original_url && doc.fields.origin) {

        var original_urls = doc.fields.original_url;
        var origins = doc.fields.origin;

        // for each original url, emit the original url as key and corresponding origin (new url) as value
        Object.keys(original_urls).map(function(curr) {
            var key = original_urls[curr][0];
            var value = origins[curr][0];
            emit(key, value);
        });
    }
}
