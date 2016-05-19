/**
 * View returning the list of types and the amount of document of these types
 *
 * @type {{map: Function, reduce: string}}
 */
function(doc) {
    if (doc.producer && doc.type && !doc.deleted_by_producer) {
        var key = [doc.type];
        emit(key, 1);
    }
}
