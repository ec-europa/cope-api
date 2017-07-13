/**
 * Handle the deleted_by_producer flag
 *
 * @param doc
 * @returns {*}
 */
(function deleteDoc(doc) {
  if (!doc) {
    return [null, {
      code: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'missed',
        reason: 'no document to delete'
      })
    }];
  }

  // append deleted_by_producer to the document
  doc._deleted = true;

  return [doc, {
    code: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ok: true,
      id: doc._id
    })
  }];
});
