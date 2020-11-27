import {el, empty} from 'helperFunctions';

export default class Video {
  constructor() {
    this.content = document.querySelector('video');
    this.url = './videos.json';
  }

  getData() {
    showLoading('Sæki gögn');

    return fetch(this.url)
      .then((result) => {
        if(!result.ok) {
          throw new Error('Mistókst að sækja gögn');
        }
        const itsJSON = result.json();
        return itsJSON.videos;
      });
  }

  showVideo(data) {
    empty(this.content);
  }


  load() {
    const location = new URLSearchParams(window.location.search);
    const id = location.get('id');

    this.getData(id)
      .then(data => this.showVideo(data, id))
      .then(data => this.showRelated(data,id))
  }

}
