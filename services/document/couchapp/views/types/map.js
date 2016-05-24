/**
 * View returning the list of types and the amount of document of these types
 *
 * @type {{map: Function, reduce: string}}
 */
(function map(doc) {
  var key;

  if (doc.producer && doc.type && !doc.deleted_by_producer) {
    key = [doc.type];
    emit(key, 1);
  }
});
