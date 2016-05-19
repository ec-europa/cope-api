/**
 *
 * @param head
 * @param req
 * @returns {*}
 */
function(head, req) {

    provides('json', function() {
        var row, rows = [];
        while (row = getRow()) {
            var item = {};
            item[row.key] = row.value;
            rows.push(item);
        }
        if (req.client) {
            JSON.stringify(rows);
        }
        return toJSON(rows[0]);
    })

}
