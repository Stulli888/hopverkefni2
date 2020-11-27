import {el, empty, formatDate} from 'helperFunctions';

export default class VideoList {

  constructor() {
    this.content = document.querySelector('.list');
    this.url = './videos.json';
  }

  showLoading(text) {
    const loading = el('p', text);
    this.setContent(loading);
  }


  // Fall sem býr til nodes
  setContent(...content) {
    content.forEach((item) => {
      const contentToShow = typeof item === 'string'
        ? document.createTextNode(item) : item;

      this.content.appendChild(contentToShow);
    });
  }

  // fall sem sækir gögn úr JSON skjali og setur í html element
  showItem(data) {

    if (typeof data === 'string') {
      const categoryTitle = el('div');
      categoryTitle.classList.add('listItem__categoryTitle');
    }

    else {
      const video = el('div');
      video.classList.add('listItem__video');
      video.BackgroundImage = `${data.poster}`;


      // TODO: Formatta duration á videóum. Búa til fall?
      const formatDuration = `${data.duration}`;
      const duration = el('div', formatDuration);
      duration.classList.add('listItem__videoDuration');
      video.appendChild(duration);

      const videoTitle = el('h2', data.title);
      videoTitle.classList.add('listItem__videoTitle');

      const formatCreated = formatDate(data.created);
      const created = el('span', formatCreated);
      created.classList.add('listItem__videoDate');

      const textElements = el('div', videoTitle, created);
      textElements.classList.add('listItem__videoText');

      const clickMe = el('a', video, textElements);
      clickMe.classList.add('listItem');
      clickMe.setAttribute('href', `video.html?id=${data.id}`);

      return clickMe;
    }
  }

  // Passa að showItem fallið virki rétt miðað við þetta
  showList(data) {
    empty(this.content);

    // Ítrar gegnum hverja categoríu og býr til row fyrir titilinn
    (data.categories).forEach((cat) => {
      const titleRow = el('div', this.showItem(cat.title));
      titleRow.classList.add('row');
      this.setContent(titleRow);

      // Ítrar gegnum videos fylki undir category, sendir rétt stak úr
      // efra videos fylkinu í videos.json í showItem fallið
      const vidBoxes = (cat.videos).map((vidBox) => {
        const id = parseInt(vidBox);
        const vidInfo = data.videos[id];
        col = el('div', this.showItem(vidInfo));
        const cls = ['col-md-4', 'col-12'];
        col.classList.add(...cls);
        return col;
      })

      const vidRow = el('div', ...vidBoxes);
      vidRow.classList.add('row');
      this.setContent(vidRow);
    })
  }

  getData() {
    showLoading('Sæki gögn');

    return fetch(this.url)
      .then((result) => {
        if(!result.ok) {
          throw new Error('Mistókst að sækja gögn');
        }
        return result.json();
      });
  }

  load() {
    this.getData()
      .then(data => this.showList(data))
  }

}
