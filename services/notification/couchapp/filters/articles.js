/**
 * Change feed for article
 *
 * @param doc
 * @param req
 * @returns {boolean}
 */
function(doc, req) {

    if (doc.type === "article") {
        return true;
    }

    return false;
}
