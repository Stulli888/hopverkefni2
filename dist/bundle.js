(function (VideoList, Video) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var VideoList__default = /*#__PURE__*/_interopDefaultLegacy(VideoList);
  var Video__default = /*#__PURE__*/_interopDefaultLegacy(Video);

  document.addEventListener('DOMContentLoaded', function () {
    var page = document.querySelector('body');
    var vid = page.classList.contains('video');

    if (vid) {
      var video = new Video__default['default']();
      video.load();
    } else {
      var videoList = new VideoList__default['default']();
      videoList.load();
    }
  });

}(VideoList, Video));
//# sourceMappingURL=bundle.js.map
