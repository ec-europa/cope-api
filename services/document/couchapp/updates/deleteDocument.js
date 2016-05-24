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
      json: {
        error: 'missed',
        reason: 'no document to delete'
      }
    }];
  }

  // append deleted_by_producer to the document
  doc.deleted_by_producer = true;

  return [doc, {
    code: 200,
    json: {
      ok: true,
      id: doc._id
    }
  }];
});
