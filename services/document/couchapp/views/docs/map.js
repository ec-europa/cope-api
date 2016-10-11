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
      type: doc.type,
      version: doc.version,
      producer: doc.producer,
      producer_content_id: doc.producer_content_id,
      canonical_url: doc.canonical_url,
      created: doc.created,
      updated: doc.updated,
      default_language: doc.default_language,
      languages: doc.languages
    };

    emit(key, value);
  }
});
