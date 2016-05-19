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

    var row, rows = [];

    while (row = getRow()) {
        rows.push(row.value);
    }

    if (req.client) {
        console.log(JSON.stringify(rows));
    }

    return toJSON(rows);
}
