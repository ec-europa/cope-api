/**
 * View returning Full fields for all documents by producer by schema
 *
 * @type {{map: Function}}
 */
(function map(doc) {
  var key;
  var value;

  if (doc.type && !doc.deleted_by_producer) {
    key = [doc.producer, doc.type];
    value = doc.fields;

    emit(key, value);
  }
});
