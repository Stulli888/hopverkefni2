import {el, empty} from 'helperFunctions';

export default class video {
  constructor() {
    this.content = document.querySelector('video');
    this.url = './videos.json';
  }

  getData(id) {
    showLoading('Sæki gögn');

    return fetch(this.url)
      .then((result) => {
        if(!result.ok) {
          throw new Error('Mistókst að sækja gögn');
        }
        const itsJSON = result.json();
        return itsJSON.videos[id];
      });
  }


  load() {
    const location = new URLSearchParams(window.location.search);
    const id = location.get('id');

    this.getData(id)
      .then(data => this.showVideo(data))
  }

}
