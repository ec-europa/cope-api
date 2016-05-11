/**
 * View returning all documents not deleted by producer
 *
 * @type {{map: Function}}
 */
function(doc) {
    if (doc.producer && !doc.deleted_by_producer) {
        var key = doc.producer; //sort by post date desc and return title, thumbnail, nbr of comments, author, avatar, authid, post id
        var value = {
            title: doc.fields.title,
            created: doc.created
        };
        emit(key, value);
    }
}
