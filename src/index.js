import makeList from './videoList';
import Video from './video';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const video = page.classList.contains('videoPage');

  if (video) {
    const video = new Video();
    video.load();
  } else {
    makeList(page);
  }
});
