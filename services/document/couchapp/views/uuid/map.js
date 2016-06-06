/**
 * View returning the _id not deleted by producer for a given producer and producer_content_id
 *
 * @param {string} producer is the producer username.
 * @param {string} producer_content_id is the procuder internal id username.
 *
 * @type {{map: Function}}
 */
(function map(doc) {
  var key;
  var value;

  if (doc.producer && doc.producer_content_id && !doc.deleted_by_producer) {
    // sort by post date desc and return title, thumbnail, nbr of comments,
    // author, avatar, authid, post id
    key = [doc.producer, doc.producer_content_id];
    value = doc._id;
    emit(key, value);
  }
});
