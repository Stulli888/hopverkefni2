// fall sem setur aldur myndbands í rétt form
export default function formatDate(created) {
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
