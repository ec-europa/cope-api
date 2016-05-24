/**
 * Return a filtered version of document
 *
 * @param doc
 * @returns {*}
 */
(function show(doc) {
  var newDoc = {};

  if (doc == null) {
    return {
      code: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'not_found',
        reason: 'document doesn\'t exist'
      })
    };
  }

  if (doc.deleted_by_producer) {
    return {
      code: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'not_found',
        reason: 'deleted'
      })
    };
  }

  newDoc._id = doc._id;
  newDoc.created = doc.created;
  newDoc.updated = doc.updated;
  newDoc.default_language = doc.default_language;
  newDoc.languages = doc.languages;
  newDoc.fields = doc.fields;

  return {
    code: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDoc)
  };
});
