/**
 * Handle the deleted_by_producer flag
 *
 * @param doc
 * @param req
 * @returns {*}
 */
function(doc, req) {

    if (!doc) {
        return [null, {
            'code': 400,
            'json': {
                'error': 'missed',
                'reason': 'no document to delete'
            }
        }];
    }

    doc.deleted_by_producer = true; // append deleted_by_producer to the document

    return [doc, {
        'code': 200,
        'json': {
            "ok": true,
            "id": doc._id
        }
    }];
}
