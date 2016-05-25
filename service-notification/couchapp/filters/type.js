/**
 * Change feed for :type
 *
 * @param doc
 * @param req
 * @returns {boolean}
 */
function(doc, req) {

    if (doc.type === req.query.type) {
        return true;
    }

    return false;
}
