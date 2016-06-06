(function show(doc, req) {

  var api = this.rewrites;

  provides('json', function providesJSON() {
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      body: toJSON(api)
    };
  });

  provides('html', function providesHTML() {
    return {
      headers: {
        'Content-Type': 'text/html'
      },
      body: ''.concat(
        '<html>',
        '<head><link rel="stylesheet" href="static/api.css"><script src="static/api.js"></script></head>',
        '<body><aside class="sidenav"></aside><div id="content">',
        (function () {
          var content = '';
          for (var endpoint in api) {

            if (api[endpoint].hasOwnProperty('documentation')) {
              content += ''.concat('<fieldset>');
              content += ''.concat('<legend><a name="', api[endpoint].documentation.title, '">', api[endpoint].documentation.title, '</a></legend>');
              content += ''.concat('<div class="bubble bubble-verb bubble-verb-', api[endpoint].method, '">', api[endpoint].method, '</div>');
              content += ''.concat('<code class="bubble">', api[endpoint].from, '</code>');
              content += ''.concat('<h3>Description</h3><p> ', api[endpoint].documentation.description, '</p>');

              if (api[endpoint].documentation.hasOwnProperty('params')) {

                content += ''.concat('<h3>Parameters</h3>');
                content += ''.concat('<table><thead><tr><th>Field</th><th>Description</th></tr></thead>');
                for (var param in api[endpoint].documentation.params) {
                  content += ''.concat('<tbody><tr><td>', param, "</td><td>", api[endpoint].documentation.params[param], '</td></tr>');
                }
                content += ''.concat('</table>');
              }

              if (api[endpoint].documentation.hasOwnProperty('headers')) {

                content += ''.concat('<h3>Headers</h3>');
                content += ''.concat('<table><thead><tr><th>Header</th><th>Value</th></tr></thead>');
                for (var header in api[endpoint].documentation.headers) {
                  content += ''.concat('<tbody><tr><td>', header, "</td><td>", api[endpoint].documentation.headers[header], '</td></tr>');
                }
                content += ''.concat('</table>');
              }
              content += ''.concat('</fieldset>');
            }
          }
          return content;
        }()),
        '</div></body></html>'
      )
    }
  });

  registerType('text-plain', 'text/plain');

  provides('text/plain', function providesText() {
    return toJSON(doc);
  });
});
