/**
 *
 * @param head
 * @param req
 * @returns {*}
 */
(function list(head, req) {
  var row;
  var doc = {
    total_rows : head.total_rows,
    offset : head.offset,
    rows : []
  };

  start({
    code: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  row = getRow();

  while (row) {
    doc.rows.push(row.value);
    row = getRow();
  }

  return toJSON(doc);
});