/**
 * View returning the language coverage for a given origin
 *
 * @param {string} origin.
 *
 * @type {{map: Function}}
 */
(function maps(doc) {
  var originalUrls;
  var origins;

  if (doc.producer && doc.producer_content_id && !doc.deleted_by_producer
    && doc.fields.original_url && doc.fields.origin) {
    originalUrls = doc.fields.original_url;
    origins = doc.fields.origin;

    // for each original url, emit the original url as key
    // and corresponding origin (new url) as value
    Object.keys(originalUrls).forEach(function mapOriginalNew(curr) {
      var key = originalUrls[curr][0];
      var value = origins[curr][0];
      emit(key, value);
    });
  }
});
