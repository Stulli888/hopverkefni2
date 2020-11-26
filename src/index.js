import {formatDate} from 'date.js';

const program = (() => {
  //const videoList;

  // fall sem birtir skilaboð meðan efni er sótt
  function showLoading() {

  }


  // fall sem færir gögn yfir i html hluti
  function showCategories(data) {

    const category = videoList.getElementsByClassName('.category');

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

        // Sækir id númer j úr videos fylkinu
        const imgId = thisCategory.videos[j];
        const videoData = data.videos[imgId];

        // Sækir viðeigandi background og breytir <a> elementi
        // undir video elementinu til að vísa á rétt id. (þarf þetta??)
        vid.backgroundImage = `${videoData.poster}`;
        const link = vid.getElementsByTagName('a');
        const s = link[0].getAttribute('href');
        link.setAttribute('href', `${s}?id=${imgId}`);
        vidTitle.textContent = videoData.title;

        // Sendir gildi "created" þ.e. aldur video í formatDate fall
        // til að fá dagsetningu í rétt form
        videoTime.textContent = formatDate(videoData.created);

      }

    }
  }


  // event handler fyrir það að smella á video og fara yfir í video hluta
  function play(e) {
    e.getElementsByTagName('a').click();

    //TODO þarf að setja upp
  }


  function init(_videos) {
    const videoList = _videos;
    //videoList = _videos;
    const categoryVideo = videoList.getElementsByClassName('.categoryVideo');

    fetch("./videos.json")
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

  // Setja EventListener á öll video
  for (const i of categoryVideo) {
    categoryVideo[i].addEventListener('click', play);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', async () => {
  program.init(document.querySelector('.videos'));
});
