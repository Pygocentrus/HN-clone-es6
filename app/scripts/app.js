(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var conf = _interopRequire(require("./libs/conf"));

var utils = _interopRequire(require("./libs/utils"));

var HN = _interopRequire(require("./libs/hn"));

HN.getLatestPosts().then(function (data) {
  var latestPosts = utils.take(data, conf.displayOffset);

  var promises = latestPosts.map(function (post) {
    return HN.getPost(post);
  });

  Promise.all(promises).then(function (data) {
    console.log(data);
    utils.render(data);
  });
})["catch"](console.error);

},{"./libs/conf":2,"./libs/hn":3,"./libs/utils":5}],2:[function(require,module,exports){
"use strict";

module.exports = {
  api: {
    base: "https://hacker-news.firebaseio.com/v0",
    latest: "/topstories.json",
    post: "/item/",
    user: "/user/" },
  displayOffset: 15 };

},{}],3:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var conf = _interopRequire(require("./conf"));

var utils = _interopRequire(require("./utils"));

module.exports = {

  getLatestPosts: function getLatestPosts() {
    return utils.get(conf.api.base + conf.api.latest);
  },

  getPost: function getPost(id) {
    return utils.get(conf.api.base + conf.api.post + id + ".json");
  },

  getUser: function getUser(id) {
    return utils.get(conf.api.base + conf.api.user + id + ".json");
  } };

},{"./conf":2,"./utils":5}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UI = (function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, null, {
    singlePost: {
      value: function singlePost(post) {
        return ["<li>", "<a href=\"" + post.url + "\" target=\"_blank\">", post.title, "</a>", "</li>"].join("");
      }
    },
    posts: {
      value: (function (_posts) {
        var _postsWrapper = function posts(_x) {
          return _posts.apply(this, arguments);
        };

        _postsWrapper.toString = function () {
          return _posts.toString();
        };

        return _postsWrapper;
      })(function (posts) {
        var _this = this;

        return posts.reduce(function (previous, post) {
          return previous + _this.singlePost(post);
        }, "");
      })
    }
  });

  return UI;
})();

;

module.exports = UI;

},{}],5:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var conf = _interopRequire(require("./conf"));

var UI = _interopRequire(require("./ui"));

module.exports = {

  get: function get(url) {
    return new Promise(function (resolve, reject) {
      fetch(url).then(function (response) {
        if (response.status === 200) {
          response.json().then(resolve);
        }
      })["catch"](reject);
    });
  },

  take: function take(elements, length) {
    return elements.slice(0, length);
  },

  render: function render(data) {
    var posts = UI.posts(data);

    document.querySelector("#posts").innerHTML = posts;
  } };

},{"./conf":2,"./ui":4}]},{},[1]);
