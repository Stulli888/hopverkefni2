import {el, formatDate} from './lib/helperFunctions';

export default class Video {
  constructor() {
    this.content = document.querySelector('video');
    this.url = './videos.json';
    const location = new URLSearchParams(window.location.search);
    this.id = location.get('id');
  }

  // TODO: klára að formatta lengd á video
  formatLength(s) {
    const l = s.length;
  }

  getRelatedVideos(related, data) {

    related.forEach((i) => {
      if(i) {
        const vidData = data[i-1];

        const video = el('div');
        let st = `list-item__video__${vidData.id}`;
        video.classList.add(st);

        const formatDuration = `${vidData.duration}`;
        this.formatLength(formatDuration);
        const duration = el('div', formatDuration);
        duration.classList.add('list-item__videoDuration');
        video.appendChild(duration);

        const videoTitle = el('h2', vidData.title);
        videoTitle.classList.add('list-item__videoTitle');

        const formatCreated = formatDate(vidData.created);
        const created = el('span', formatCreated);
        created.classList.add('list-item__videoDate');

        const textElements = el('div', videoTitle, created);
        textElements.classList.add('list-item__videoText');

        const clickMe = el('a', video, textElements);
        clickMe.classList.add('list-item');
        clickMe.setAttribute('href', `video.html?id=${vidData.id}`);

        const col = el('div', clickMe);
        const cls = ['col', 'col-md-4', 'col-12', 'img-link'];
        col.classList.add(...cls);
        document.getElementById('related-videos').appendChild(col);
      }
    })

  }

  getVideoSources(source) {
    const s = source.slice(2);
    return s;
  }

  setData(data) {
    const vidList = data.videos;
    const vidIdInfo = data.videos[this.id-1];

    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
      var videoContainer = document.getElementById('videoPlayer');

      // Sækir gögn fyrir video elementið
      const video = document.getElementById('video');
      let poster = this.getVideoSources(vidIdInfo.poster);
      video.setAttribute('poster', `${poster}`);
      const source = el('source');
      let str = this.getVideoSources(vidIdInfo.video);
      source.setAttribute('src', `${str}`);
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);

      // Gögn fyrir

      var videoControls = document.getElementById('video-controls');
      video.controls = false;
      videoControls.style.display = 'flex';

      var rewind = document.getElementById('rewind');
      var playpause = document.getElementById('playpause');
      var mute = document.getElementById('mute');
      var fullscreen = document.getElementById('fullscreen');
      var forward = document.getElementById('forward');

      rewind.addEventListener('click', function(e) {
        let currentTime = video.currentTime;
        video.currentTime = currentTime - 3;
      });

      forward.addEventListener('click', function(e) {
        let currentTime = video.currentTime;
        video.currentTime = currentTime + 3;
      });

      playpause.addEventListener('click', function(e) {
        if (video.paused || video.ended) video.play();
        else video.pause();
      });

      mute.addEventListener('click', function(e) {
        video.muted = !video.muted;
      });

      var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
      if (!fullScreenEnabled) {
        fullscreen.style.display = 'none';
      }
      fullscreen.addEventListener('click', function(e) {
        handleFullscreen();
      });

      var handleFullscreen = function() {
        if (isFullScreen()) {
          if (document.exitFullscreen) document.exitFullscreen();
          else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
          else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
          else if (document.msExitFullscreen) document.msExitFullscreen();
          setFullscreenData(false);
        }
        else {
          if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
          else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
          else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
          else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
          setFullscreenData(true);
        }
      }
      var isFullScreen = function() {
        return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
      }
      var setFullscreenData = function(state) {
        videoContainer.setAttribute('data-fullscreen', !!state);
      }

      document.addEventListener('fullscreenchange', function(e) {
        setFullscreenData(!!(document.fullscreen || document.fullscreenElement));
      });
      document.addEventListener('webkitfullscreenchange', function() {
         setFullscreenData(!!document.webkitIsFullScreen);
      });
      document.addEventListener('mozfullscreenchange', function() {
         setFullscreenData(!!document.mozFullScreen);
      });
      document.addEventListener('msfullscreenchange', function() {
         setFullscreenData(!!document.msFullscreenElement);
      });

      let description = `${vidIdInfo.description}`;
      const descriptionContainer = el('p', description);
      descriptionContainer.classList.add('description-text');
      const desCol = el('div', descriptionContainer);
      const cls = ['col', 'col-md-4', 'col-12'];
      desCol.setAttribute(...cls);
      document.getElementById('video-description').appendChild(desCol);

      this.getRelatedVideos(vidIdInfo.related, vidList);

      const linkBack = el('a', 'Til baka');
      linkBack.classList.add('linkBack');
      linkBack.setAttribute('href', 'index.html');
      const linkBackContainer = el('div', linkBack);
      linkBackContainer.classList.add("link-container");
      document.getElementById('til-baka').appendChild(linkBackContainer);
    }

  }

  getData() {
    //showLoading('Sæki gögn');

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
        .then(data => this.setData(data))

  }
}
