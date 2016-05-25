/**
 *  Change feed for :type from a given :producer
 *
 * @param doc
 * @param req
 * @returns {boolean}
 */
function(doc, req) {

    if (doc.type === req.query.type && doc.producer == req.query.producer) {
        return true;
    }

    return false;
}
