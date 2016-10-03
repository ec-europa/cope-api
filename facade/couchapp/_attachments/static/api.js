function generateNav() {
  var endpoints = document.querySelectorAll('fieldset');
  var sidenav = document.querySelector('aside');
  var li = document.createElement('ul');

  var x;
  var title;
  var link;
  var item;

  for (x = 0; x < endpoints.length; x += 1) {
    if (endpoints.item(x).querySelector('legend') != null) {
      title = endpoints.item(x).querySelector('legend').querySelector('a').getAttribute('name');

      link = document.createElement('a');
      link.textContent = title;
      link.setAttribute('href', '#'.concat(title));

      item = document.createElement('li');

      item.appendChild(link);
      li.appendChild(item);
    }
  }

  sidenav.appendChild(li);
}

document.onreadystatechange = function handleOnReadyStatechange() {
  if (document.readyState === 'interactive') {
    generateNav();
  }
};
