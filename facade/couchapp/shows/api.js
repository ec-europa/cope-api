(function show(doc) {
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
        '<head><link rel="stylesheet" href="beta/static/api.css"><script src="beta/static/api.js"></script></head>',
        '<body><aside class="sidenav"></aside><div id="content">',
        (function writeDoc() {
          var content = '';
          var endpoint;
          var param;
          var header;

          for (endpoint in api) {
            if ({}.hasOwnProperty.call(api, endpoint) && {}.hasOwnProperty.call(api[endpoint], 'documentation')) {
              content += ''.concat('<fieldset>');
              content += ''.concat('<legend><a name="', api[endpoint].documentation.title, '">', api[endpoint].documentation.title, '</a></legend>');
              content += ''.concat('<div class="bubble bubble-verb bubble-verb-', api[endpoint].method, '">', api[endpoint].method, '</div>');
              content += ''.concat('<code class="bubble">', api[endpoint].from, '</code>');
              content += ''.concat('<h3>Description</h3><p> ', api[endpoint].documentation.description, '</p>');

              if ({}.hasOwnProperty.call(api[endpoint].documentation, 'params')) {
                content += ''.concat('<h3>Parameters</h3>');
                content += ''.concat('<table><thead><tr><th>Field</th><th>Description</th></tr></thead>');
                for (param in api[endpoint].documentation.params) {
                  if ({}.hasOwnProperty.call(api[endpoint].documentation.params, param)) {
                    content += ''.concat('<tbody><tr><td>', param, '</td><td>', api[endpoint].documentation.params[param], '</td></tr>');
                  }
                }
                content += ''.concat('</table>');
              }

              if ({}.hasOwnProperty.call(api[endpoint].documentation, 'headers')) {
                content += ''.concat('<h3>Headers</h3>');
                content += ''.concat('<table><thead><tr><th>Header</th><th>Value</th></tr></thead>');
                for (header in api[endpoint].documentation.headers) {
                  if ({}.hasOwnProperty.call(api[endpoint].documentation.headers, header)) {
                    content += ''.concat('<tbody><tr><td>', header, '</td><td>', api[endpoint].documentation.headers[header], '</td></tr>');
                  }
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
    };
  });

  registerType('text-plain', 'text/plain');

  provides('text/plain', function providesText() {
    return toJSON(doc);
  });
});
