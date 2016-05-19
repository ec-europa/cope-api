/**
 *  Change feed for article from a given producer
 *
 * @param doc
 * @param req
 * @returns {boolean}
 */
function(doc, req) {

    if (doc.type === "article" && doc.producer == req.query.producer) {
        return true;
    }

    return false;
}
