/**
 * Change feed for article
 *
 * @param doc
 * @returns {boolean}
 */
(function filter(doc) {
  if (doc.type === 'article') {
    return true;
  }

  return false;
});
