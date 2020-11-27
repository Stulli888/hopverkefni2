import videoList from 'videoList';
import video from 'video';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const video = page.classList.contains('video');

  if (video) {
    const video = new video();
    video.load();
  } else {
    const videoList = new videoList();
    videoList.load();
  }
});
