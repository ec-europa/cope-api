/**
 *
 * @param head
 * @param req
 * @returns {*}
 */
function(head, req) {
    start({
        code: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    var row;
    var doc = {
    	total_rows : head.total_rows,
    	offset : head.offset,
    	rows : []
    };

    while (row = getRow()) {
        rows.push(row.value);
    }

    if (req.client) {
        console.log(JSON.stringify(rows));
    }

    return toJSON(doc);
}
