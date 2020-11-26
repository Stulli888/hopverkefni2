import {formatDate} from 'date.js';

const program = (() => {
  const videoList;

  // fall sem birtir skilaboð meðan efni er sótt
  function showLoading() {

  }


  // fall sem færir gögn yfir i html hluti
  function showCategories(data) {

    const category = document.getElementsByClassName('.category');

    for (const i in data.categories) {

      const thisCategory = data.categories[i];
      category[i].querySelector('.categoryNameRow').textContent = thisCategory.title;
      const videoBox = category[i].getElementsByClassName('.categoryVideoBox');

      for (const j in thisCategory.videos) {

        const vid = videoBox[j].querySelector('.categoryVideo');
        const vidTitle = videoBox[j].querySelector('.categoryVideoTitle');
        const videoTime = videoBox[j].querySelector('.categoryVideoDate');

        const imgId = thisCategory.videos[j];
        const videoData = data.videos[imgId];

        vid.setAttribute('src', `${videoData.poster}`)
        vidTitle.textContent = videoData.title;

        // TODO: klára formatDate fall og setja videoData.created í það
        videoTime.textContent = formatDate(videoData.created);

      }

    }
  }


  // event handler fyrir það að smella á video og fara yfir í video hluta
  function play(e) {

  }


  function init(_videos) {
    videoList = _videos;

    for(const category of videoList.querySelector('.category')) {
      const categoryVideo = category.querySelector('.categoryVideo');
      categoryVideo.addEventListener('click', play);
    }

  fetch(`.videos.json`)
    .then((list) => {
      if (!list.ok) {
        throw new Error('Non 200 status');
      }
      return list.json();
    })
    .then((data) => {
      showCategories(data);
    })
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', async () => {
  program.init(document.querySelector('.videos'));
});
