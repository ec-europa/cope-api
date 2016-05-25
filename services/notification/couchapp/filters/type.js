/**
 * Change feed for :type
 *
 * @param doc
 * @param req
 * @returns {boolean}
 */
(function filter(doc, req) {
  if (doc.type === req.query.type) {
    return true;
  }

  return false;
});
