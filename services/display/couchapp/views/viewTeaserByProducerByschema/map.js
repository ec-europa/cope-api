/**
 * View returning Teaser fields for all documents by producer by schema
 *
 * @type {{map: Function}}
 */
function(doc) {
    if (doc.type && !doc.deleted_by_producer) {
        var key = [doc.producer, doc.type];
        var value = {
            title: doc.fields.title,
            created: doc.created,
            type: doc.type,
            thumbnail: doc.thumbnail,
            summary: doc.summary
        };
        emit(key, value);
    }
}
