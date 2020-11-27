import {el, empty, formatDate} from 'helperFunctions';
import {getData} from 'getData';

export default function makeList(container) {
  videoList.init(container);
}

const videoList = (() => {
  const content;
  const response;
  const url = './videos.json';

  function showLoading(text) {
    const loading = el('p', text);
    setContent(loading);
  }

  // Fall sem býr til nodes
  function setContent(...content) {
    content.forEach((item) => {
      const contentToShow = typeof item === 'string'
        ? document.createTextNode(item) : item;

      content.appendChild(contentToShow);
    });
  }

  function showItem(data) {

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

  function showList(data) {
    empty(content);

    (data.categories).forEach((cat) => {
      const titleRow = el('div', showItem(cat.title));
      titleRow.classList.add('row');
      setContent(titleRow);

      const vidBoxes = (cat.videos).map((vidBox) => {
        const id = parseInt(vidBox);
        const vidInfo = data.videos[id];
        col = el('div', showItem(vidInfo))
        const cls = ['col-md-4', 'col-12'];
        col.classList.add(...cls);
        return col;
      })

      const vidRow = el('div', ...vidBoxes);
      vidRow.classList.add('row');
      setContent(vidRow);
    })
  }

  function init(body) {
    content = body.querySelector('list');
    response = getData(url);
    showList(response);
  }

})();
