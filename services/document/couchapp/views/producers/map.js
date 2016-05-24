/**
 * View returning the list of producers and the amount of document they own
 *
 * @type {{map: Function, reduce: string}}
 */
(function map(doc) {
  var key;

  if (doc.producer && doc.type && !doc.deleted_by_producer) {
    key = [doc.producer];
    emit(key, 1);
  }
});
