/**
 * View returning all subscriptions for consumers
 *
 * @type {{map: Function}}
 */
(function map(doc) {
  var key;
  var value;

  if (doc.consumer) {
    key = doc.consumer;
    value = doc;
    emit(key, value);
  }
});
