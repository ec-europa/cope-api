/**
 * View returning all documents not deleted by producer
 *
 * @type {{map: Function}}
 */
function(doc) {
    if (doc.producer && !doc.deleted_by_producer) {
        var key = [doc.type,doc.producer]; 
        var value = {
            title: doc.fields.title,
            created: doc.created
        };
        emit(key, value);
    }
}
