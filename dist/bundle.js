(function (date_js) {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var program = function () {


    function showCategories(data) {
      var category = document.getElementsByClassName('.category');

      for (var i in data.categories) {
        var thisCategory = data.categories[i];
        category[i].querySelector('.categoryNameRow').textContent = thisCategory.title;
        var videoBox = category[i].getElementsByClassName('.categoryVideoBox');

        for (var j in thisCategory.videos) {
          var vid = videoBox[j].querySelector('.categoryVideo');
          var vidTitle = videoBox[j].querySelector('.categoryVideoTitle');
          var videoTime = videoBox[j].querySelector('.categoryVideoDate');
          var imgId = thisCategory.videos[j];
          var videoData = data.videos[imgId];
          vid.setAttribute('src', "".concat(videoData.poster));
          vidTitle.textContent = videoData.title; // TODO: klára formatDate fall og setja videoData.created í það

          videoTime.textContent = date_js.formatDate(videoData.created);
        }
      }
    } // event handler fyrir það að smella á video og fara yfir í video hluta


    function play(e) {}

    function init(_videos) {
      var videoList = _videos;

      var _iterator = _createForOfIteratorHelper(videoList.querySelector('.category')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var category = _step.value;
          var categoryVideo = category.querySelector('.categoryVideo');
          categoryVideo.addEventListener('click', play);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      fetch(".videos.json").then(function (list) {
        if (!list.ok) {
          throw new Error('Non 200 status');
        }

        console.log("hæ");
        return list.json();
      }).then(function (data) {
        showCategories(data);
      });
    }

    return {
      init: init
    };
  }();

  document.addEventListener('DOMContentLoaded', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("hæ");
            program.init(document.querySelector('.videos'));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

}(date_js));
//# sourceMappingURL=bundle.js.map
