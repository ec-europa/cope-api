/**
 * View returning all documents not deleted by producer
 *
 * @type {{map: Function}}
 */
function(doc) {
    if (doc.schema === "article" && !doc.deleted_by_producer) {
        emit(doc.title, doc);
    }
}
