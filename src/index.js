import VideoList from 'videoList';
import Video from 'video';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const vid = page.classList.contains('video');

  if (vid) {
    const video = new Video();
    video.load();
  } else {
    const videoList = new VideoList();
    videoList.load();
  }
});
