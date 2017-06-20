/**
 * Validation function applied to all documents.
 *
 * @param newDoc the document to be inserted
 * @param oldDoc the current version of the document (null in case of creation)
 * @param userCtx the current user
 */
(function validate(newDoc, oldDoc, userCtx) {

  // is the user authenticated ?
  if (!userCtx.name) {
    throw ({
      unauthorized: 'only authenticated users can post'
    });
  }

  // onDeleted skip required fields check
  if ((newDoc.deleted_by_producer && oldDoc.producer === userCtx.name) || userCtx.name === 'admin') {
    return;
  }

  // is user owner of both revision of this document? (UPDATE)
  if (oldDoc && oldDoc.consumer !== newDoc.consumer) {
    throw ({
      unauthorized: 'You may only update your documents ' + userCtx.name
    });
  }

  // is user author of this document? (CREATE)
  if (newDoc.consumer !== userCtx.name && userCtx.name !== 'admin') {
    throw ({
      unauthorized: 'You may only create documents under your name ' + userCtx.name
    });
  }

  // newDoc needs to declare a endpoint to do validation
  if (!newDoc.endpoint) {
    throw ({
      forbidden: 'The endpoint is missing.'
    });
  }

});
