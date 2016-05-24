/**
 *
 * @param head
 * @param req
 * @returns {*}
 */
(function list(head, req) {
  provides('json', function providesJSON() {
    var row;
    var rows = [];
    var item;

    row = getRow();

    while (row) {
      item = {};
      item[row.key] = row.value;
      rows.push(item);
      row = getRow();
    }

    if (req.client) {
      JSON.stringify(rows);
    }

    return toJSON(rows[0]);
  });
});
