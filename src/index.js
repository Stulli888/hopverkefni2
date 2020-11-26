import {formatDate} from 'date.js';

const program = (() => {
  const videoList;

  // fall sem birtir skilaboð meðan efni er sótt
  function showLoading() {

  }


  // fall sem færir gögn yfir i html hluti
  function showCategories(data) {

    const category = document.getElementsByClassName('.category');

    // Ítrar samtímis yfir li element með 'category' klasa
    // og "categories" í videos.json til að sækja gögn
    for (const i in data.categories) {

      const thisCategory = data.categories[i];
      category[i].querySelector('.categoryNameRow').textContent = thisCategory.title;
      const videoBox = category[i].getElementsByClassName('.categoryVideoBox');

      // Ítrar yfir "videos" fylki innan "categories" í json
      // sækir þaðan gögn fyrir video hluti
      for (const j in thisCategory.videos) {

        const vid = videoBox[j].querySelector('.categoryVideo');
        const vidTitle = videoBox[j].querySelector('.categoryVideoTitle');
        const videoTime = videoBox[j].querySelector('.categoryVideoDate');

        const imgId = thisCategory.videos[j];
        const videoData = data.videos[imgId];

        vid.backgroundImage = `${videoData.poster}`;
        vidTitle.textContent = videoData.title;

        // Sendir gildi "created" þ.e. aldur video í formatDate fall
        // til að fá dagsetningu í rétt form
        videoTime.textContent = formatDate(videoData.created);

      }

    }
  }


  // event handler fyrir það að smella á video og fara yfir í video hluta
  function play(e) {

  }


  function init(_videos) {
    videoList = _videos;
    const categoryVideo = videoList.getElementsByClassName('.categoryVideo');

    // Setja EventListener á öll video
    for (const i of categoryVideo) {
      categoryVideo[i].addEventListener('click', play);
    }

    fetch(`https://notendur.hi.is/~brs26/hopverkefni2/videos.json`)
      .then((result) => {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }
        return result.json();
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
