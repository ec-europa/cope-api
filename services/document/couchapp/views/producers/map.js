/**
 * View returning the list of producers and the amount of document they own
 *
 * @type {{map: Function, reduce: string}}
 */
function(doc) {
    if (doc.producer && doc.type && !doc.deleted_by_producer) {
        var key = [doc.producer];
        emit(key, 1);
    }
}
