import {el, empty, getData} from './lib/helperFunctions';

export default class Video {
  constructor() {
    this.content = document.querySelector('video');
    this.url = './videos.json';
    const location = new URLSearchParams(window.location.search);
    this.id = location.get('id');
  }

  // Fall sem býr til nodes
  setContent(...contentToMake) {
    contentToMake.forEach((item) => {
      const contentToShow = typeof item === 'string'
        ? document.createTextNode(item) : item;

      this.content.appendChild(contentToShow);
    });
  }

  getVideoLink(source) {
    const s = source.slice(2);
    return s;
  }

  setData(data) {
    console.log(`id = ${this.id}`);
    const vidIdInfo = data.videos[this.id-1];

    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
      var videoContainer = document.getElementById('videoPlayer');
      var video = document.getElementById('video');
      var source = document.getElementsByTagName('source');
      let str = this.getVideoLink(vidIdInfo.video);
      //source.setAttribute('src', str);
      var videoControls = document.getElementById('video-controls');
      video.controls = false;
      videoControls.style.display = 'flex';

      var rewind = document.getElementById('rewind');
      var playpause = document.getElementById('playpause');
      var mute = document.getElementById('mute');
      var fullscreen = document.getElementById('fullscreen');
      var forward = document.getElementById('forward');

      const linkBack = el('a', 'Til baka');
      linkBack.classList.add('linkBack');
      linkBack.setAttribute('href', 'index.html');
      const linkBackRow = el('div', linkBack);
      linkBackRow.classList.add('row');
      document.getElementById('videoPlayer').appendChild(linkBackRow);

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
