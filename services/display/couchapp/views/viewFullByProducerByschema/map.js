/**
 * View returning Full fields for all documents by producer by schema
 *
 * @type {{map: Function}}
 */
function(doc) {
    if (doc.type && !doc.deleted_by_producer) {
        var key = [doc.producer, doc.type];
        var value = doc.fields;
        emit(key, value);
    }
}
