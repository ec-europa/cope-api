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
      id: doc._id,
      fields: doc.fields,
      created: doc.created
    };

    emit(key, value);
  }
});
