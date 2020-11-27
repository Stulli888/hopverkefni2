(function (videoList, Video) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Video__default = /*#__PURE__*/_interopDefaultLegacy(Video);

  document.addEventListener('DOMContentLoaded', function () {
    var page = document.querySelector('body');
    var video = page.classList.contains('videoPage');

    if (video) {
      var _video = new Video__default['default']();

      _video.load();
    } else {
      videoList.makeList(page);
    }
  });

}(videoList, Video));
//# sourceMappingURL=bundle.js.map
