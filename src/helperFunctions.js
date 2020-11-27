// fall sem eyðir elementum
export function empty(e) {
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
}

// fall sem býr til ný element (TODO bæta við eventHandler virkni?)
export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    for (let child of children) { /* eslint-disable-line */
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    }
  }
 return element;
}

// fall sem setur aldur myndbands í rétt form
export function formatDate(created) {
  const s = "";
  const now = Date.now();
  const elapsed = now - created;

  // Tími síðan myndband var búið til í klukkustundum
  elapsed = ((elapsed/1000)/60)/60;

  if (elapsed > 8760) {
    elapsed = parseInt(elapsed/8760);

    if(elapsed > 1) {
      s = `Fyrir ${elapsed} árum síðan`;
    }

    else {
      s = `Fyrir ${elapsed} ári síðan`;
    }
  }

  else if (elapsed > 720) {
    elapsed = parseInt(elapsed/720);

    if(elapsed > 1) {
      s = `Fyrir ${elapsed} mánuðum síðan`;
    }

    else {
      s = `Fyrir ${elapsed} mánuði síðan`;
    }
  }

  else if (elapsed > 168) {
    elapsed = parseInt(elapsed/168);

    if(elapsed > 1) {
      s = `Fyrir ${elapsed} vikum síðan`;
    }

    else {
      s = `Fyrir ${elapsed} viku síðan`;
    }
  }

  else if (elapsed > 24) {
    elapsed = parseInt(elapsed/24);

    if(elapsed > 1) {
      s = `Fyrir ${elapsed} dögum síðan`;
    }

    else {
      s = `Fyrir ${elapsed} degi síðan`;
    }
  }

  else {

    if(elapsed > 1) {
      s = `Fyrir ${elapsed} klukkustundum síðan`;
    }

    else {
      s = `Fyrir ${elapsed} klukkustund síðan`;
    }
  }

  return s;
}
