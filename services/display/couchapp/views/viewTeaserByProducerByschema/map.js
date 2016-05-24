/**
 * View returning Teaser fields for all documents by producer by schema
 *
 * @type {{map: Function}}
 */
(function map(doc) {
  var key;
  var value;

  if (doc.type && !doc.deleted_by_producer) {
    key = [doc.producer, doc.type];
    value = {
      title: doc.fields.title,
      created: doc.created,
      type: doc.type,
      thumbnail: doc.thumbnail,
      summary: doc.summary
    };

    emit(key, value);
  }
});
