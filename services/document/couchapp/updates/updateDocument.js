/**
 * Triggered on POST and PUT to create or update document
 *
 * @param doc
 * @param req
 * @returns {*}
 */
function(doc, req) {

    var newdoc = JSON.parse(req.body);

    if (!doc) {
        // create new document
        if ('id' in req) {
            newdoc._id = req.uuid; // append _id field
            newdoc.producer = req.userCtx.name; // append producer field
            //TODO inject dates

            return [newdoc, {
                'code': 201,
                'json': {
                    "ok": true,
                    "id": newdoc._id
                }
            }];
        }
        // change nothing in database
        return [null, {
            'code': 400,
            'json': {
                'error': 'missed',
                'reason': 'no document to update'
            }
        }]
    } else {
        // update existing document
        newdoc._id = doc._id; // append the existing _id to the new document
        newdoc._rev = doc._rev; // append the existing _rev to the new document
        newdoc.producer = req.userCtx.name;

        return [newdoc, {
            'code': 200,
            'json': {
                "ok": true,
                "id": newdoc._id
            }
        }];
    }

}
