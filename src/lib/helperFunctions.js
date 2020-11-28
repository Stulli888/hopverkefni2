// fall sem eyðir elementum
export function empty(e) {
  if (e.firstChild) {
    while (e.firstChild) {
      e.removeChild(e.firstChild);
    }
  }
}

// Fall sem sækir gögn úr json og skilar þeim
export async function getData(url) {
  let result;

  result = await fetch(url);
  if(!result.ok) {
    console.error('Mistókst að sækja gögnin');
  }

  const data = await result.json();

  return data;
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

  let s = "string";
  const now = Date.now();
  const difference = now - created;

  // Tími síðan myndband var búið til í klukkustundum
  const elapsed = parseInt(((difference/1000)/60)/60)

  if (elapsed > 8760) {
    const years = parseInt(elapsed/8760);

    if(years > 1) {
      s = `Fyrir ${years} árum síðan`;
    }

    else {
      s = `Fyrir ${years} ári síðan`;
    }
  }

  else if (elapsed > 720) {
    const months = parseInt(elapsed/720);

    if(months > 1) {
      s = `Fyrir ${months} mánuðum síðan`;
    }

    else {
      s = `Fyrir ${months} mánuði síðan`;
    }
  }

  else if (elapsed > 168) {
    const weeks = parseInt(elapsed/168);

    if(weeks > 1) {
      s = `Fyrir ${weeks} vikum síðan`;
    }

    else {
      s = `Fyrir ${weeks} viku síðan`;
    }
  }

  else if (elapsed > 24) {
    const days = parseInt(elapsed/24);

    if(days > 1) {
      s = `Fyrir ${days} dögum síðan`;
    }

    else {
      s = `Fyrir ${days} degi síðan`;
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
