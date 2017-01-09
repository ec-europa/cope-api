/**
 * View returning the document preview for a given origin
 *
 * @param {string} origin.
 *
 * @type {{map: Function}}
 */
(function map(doc) {
  var origins;
  var values;
  if (doc.producer && doc.producer_content_id &&
      !doc.deleted_by_producer && doc.fields.canonical_url) {
    origins = doc.fields.canonical_url;
    values = {};
    values.default_language = doc.default_language;
    values.type = doc.type;
    values.fields = {};
    values.fields.title = doc.fields.title;
    values.fields.abstract = doc.fields.abstract;

    // for each original url, emit the original url as key
    // and corresponding origin (new url) as value
    Object.keys(origins).forEach(function mapOriginalNew(curr) {
      var key = origins[curr][0];
      var value = values;
      emit(key, value);
    });
  }
});
