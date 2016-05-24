/**
 * View returning all documents not deleted by producer
 *
 * @type {{map: Function}}
 */
(function map(doc) {
  var key;
  var value;

  if (doc.producer && !doc.deleted_by_producer) {
    key = [doc.type, doc.producer];
    value = {
      title: doc.fields.title,
      created: doc.created
    };

    emit(key, value);
  }
});
