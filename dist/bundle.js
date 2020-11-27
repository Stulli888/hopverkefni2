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
      var category = videoList.getElementsByClassName('.category'); // Ítrar samtímis yfir li element með 'category' klasa
      // og "categories" í videos.json til að sækja gögn

      for (var i in data.categories) {
        var thisCategory = data.categories[i];
        category[i].querySelector('.categoryNameRow').textContent = thisCategory.title;
        var videoBox = category[i].getElementsByClassName('.categoryVideoBox'); // Ítrar yfir "videos" fylki innan "categories" í json
        // sækir þaðan gögn fyrir video hluti

        for (var j in thisCategory.videos) {
          var vid = videoBox[j].querySelector('.categoryVideo');
          var vidTitle = videoBox[j].querySelector('.categoryVideoTitle');
          var videoTime = videoBox[j].querySelector('.categoryVideoDate'); // Sækir id númer j úr videos fylkinu

          var imgId = thisCategory.videos[j];
          var videoData = data.videos[imgId]; // Sækir viðeigandi background og breytir <a> elementi
          // undir video elementinu til að vísa á rétt id. (þarf þetta??)

          vid.backgroundImage = "".concat(videoData.poster);
          var link = vid.getElementsByTagName('a');
          var s = link[0].getAttribute('href');
          link.setAttribute('href', "".concat(s, "?id=").concat(imgId));
          vidTitle.textContent = videoData.title; // Sendir gildi "created" þ.e. aldur video í formatDate fall
          // til að fá dagsetningu í rétt form

          videoTime.textContent = date_js.formatDate(videoData.created);
        }
      }
    } // event handler fyrir það að smella á video og fara yfir í video hluta


    function play(e) {
      e.getElementsByTagName('a').click(); //TODO þarf að setja upp
    }

    function init(_videos) {
      var videoList = _videos; //videoList = _videos;

      var categoryVideo = videoList.getElementsByClassName('.categoryVideo');
      fetch("./videos.json").then(function (result) {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }

        return result.json();
      }).then(function (data) {
        showCategories(data);
      });
    } // Setja EventListener á öll video


    var _iterator = _createForOfIteratorHelper(categoryVideo),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var i = _step.value;
        categoryVideo[i].addEventListener('click', play);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
            program.init(document.querySelector('.videos'));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

}(date_js));
//# sourceMappingURL=bundle.js.map
