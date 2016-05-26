/**
 *
 * @param head
 * @param req
 * @returns {*}
 */
(function list(head, req) {
  var row;
  var rows = [];

  start({
    code: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  row = getRow();

  while (row) {
    rows.push(row.value);
    row = getRow();
  }

  if (req.client) {
    console.log(JSON.stringify(rows));
  }

  return toJSON(rows);
});
