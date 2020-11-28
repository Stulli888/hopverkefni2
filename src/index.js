import VideoList from './lib/videoList';
import Video from './video';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const video = page.classList.contains('video');

  if (video) {
    const video = new Video();
    video.load();
  } else {
    const videoList = new VideoList();
    videoList.load();
  }
});
