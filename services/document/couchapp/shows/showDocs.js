/**
 * Return a filtered version of document
 *
 * @param doc
 * @returns {*}
 */
(function show(doc) {
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

  return {
    code: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      _id: doc._id,
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
    })
  };
});
