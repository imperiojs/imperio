/*! Copyright Imperiojs */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// import our getCookie function which we will use to pull
	// out the roomID and nonce cookie for socket connection and display on client
	
	var _getCookie = __webpack_require__(10);
	
	var _getCookie2 = _interopRequireDefault(_getCookie);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import io from 'socket.io';
	// initialize library storage object
	var imperio = {};
	// instantiate our shared socket
	imperio.socket = io();
	// store roomID to pass to server for room creation and correctly routing the emissions
	imperio.room = (0, _getCookie2.default)('roomId');
	// store nonce to use to display and show mobile user how to connect
	imperio.nonce = (0, _getCookie2.default)('nonce');
	// take a tap event and emit the tap event
	imperio.mobileTapShare = __webpack_require__(8);
	// sets up listener for motion data and emits object containing x,y,z coords
	imperio.mobileAccelShare = __webpack_require__(5);
	// sets up a listener for orientation data and emits object containing alpha, beta, and gamma data
	imperio.mobileGyroShare = __webpack_require__(6);
	// establishes connection to socket and shares room it should connnect to
	imperio.mobileRoomSetup = __webpack_require__(7);
	// sets up listener for tap event on desktop
	imperio.desktopTapHandler = __webpack_require__(4);
	// sets up listener for accel event/data on desktop
	imperio.desktopAccelHandler = __webpack_require__(1);
	// sets up listener for gyro event/data on desktop
	imperio.desktopGyroHandler = __webpack_require__(2);
	// establishes connection to socket and shares room it should connnect to
	imperio.desktopRoomSetup = __webpack_require__(3);
	// attaches our library object to the window so it is accessible when we use the script tag
	window.imperio = imperio;
	
	// if (typeof module === 'undefined') module.exports = frontEndEcho;
	// else window.frontEndEcho = frontEndEcho;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for the acceleration event and expects to receive an object
	// with the acceleration data in the form of {x: x, y:y, z:z}.
	// Accepts 2 arguments:
	// 1. The socket you would like to connect to.
	// 2. A callback function that will be run every time the tap event is triggered.
	var desktopAccelHandler = function desktopAccelHandler(socket, callback) {
	  socket.on('acceleration', function (accelObj) {
	    if (callback) callback(accelObj);
	  });
	};
	
	module.exports = desktopAccelHandler;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for the orientation data and expects to receive an object
	// with the gyroscope data in the form of {alpha: alpha, beta:beta, gamma:gamma}.
	// Accepts 2 arguments:
	// 1. The socket you would like to connect to.
	// 2. A callback function that will be run every time the tap event is triggered.
	var desktopGyroHandler = function desktopGyroHandler(socket, callback) {
	  socket.on('gyroscope', function (gyroObj) {
	    if (callback) callback(gyroObj);
	  });
	};
	
	module.exports = desktopGyroHandler;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	// Establishes a connection to the socket and shares the room it should connnect to.
	// Accepts 3 arguments:
	// 1. The socket you would like to connect to.
	// 2. A room name that will inform the server which room to create/join.
	// 3. A callback that is invoked when the connect event is received
	// (happens once on first connect to socket).
	var desktopRoomSetup = function desktopRoomSetup(socket, room, callback) {
	  socket.on('connect', function () {
	    socket.emit('createRoom', room);
	    if (callback) callback();
	  });
	};
	
	module.exports = desktopRoomSetup;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for a tap event on the desktop.
	// Accepts 2 arguments:
	// 1. The socket you would like to connect to as the first parameter.
	// 2. A callback function that will be run every time the tap event is triggered.
	var desktopTapHandler = function desktopTapHandler(socket, callback) {
	  socket.on('tap', function () {
	    if (callback) callback();
	  });
	};
	
	module.exports = desktopTapHandler;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	// Adds a listener to the window on the mobile device in order to read the accelerometer data.
	// Will send accelerometer data to the socket in the form of {x: x, y:y, z:z}.
	// Accepts 3 arguments:
	// 1. The socket you would like to connect to as the first parameter.
	// 2. A room name that will inform the server which room to emit the acceleration event and data to.
	// 3. A callback function that will be run every time the tap event is triggered, by default
	// we will provide this function with the accelerometer data.
	var mobileAccelShare = function mobileAccelShare(socket, room, callback) {
	  window.ondevicemotion = function (event) {
	    var x = Math.round(event.accelerationIncludingGravity.x);
	    var y = Math.round(event.accelerationIncludingGravity.y);
	    var z = Math.round(event.accelerationIncludingGravity.z);
	    var accObject = {
	      x: x,
	      y: y,
	      z: z
	    };
	    // var rotation = event.rotationRate;
	    // if (rotation != null) {
	    //   var arAlpha = Math.round(rotation.alpha);
	    //   var arBeta = Math.round(rotation.beta);
	    //   var arGamma = Math.round(rotation.gamma);
	    // }
	    socket.emit('acceleration', room, accObject);
	    if (callback) callback(accObject);
	  };
	};
	
	module.exports = mobileAccelShare;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	// Adds a listener to the window on the mobile device in order to read the gyroscope data.
	// Will send gyroscope data to the socket in the form of {alpha: alpha, beta:beta, gamma:gamma}.
	// Accepts 3 arguments:
	// 1. The socket you would like to connect to as the first parameter.
	// 2. A room name that will inform the server which room to emit the gyroscope event and data to.
	// 3. A callback function that will be run every time the tap event is triggered, by default
	// we will provide this function with the gyroscope data.
	var mobileGyroShare = function mobileGyroShare(socket, room, callback) {
	  window.ondeviceorientation = function (event) {
	    var alpha = Math.round(event.alpha);
	    var beta = Math.round(event.beta);
	    var gamma = Math.round(event.gamma);
	    var gyroObject = {
	      alpha: alpha,
	      beta: beta,
	      gamma: gamma
	    };
	    socket.emit('gyroscope', room, gyroObject);
	    if (callback) callback(gyroObject);
	  };
	};
	
	module.exports = mobileGyroShare;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	// Establishes a connection to the socket and shares the room it should connnect to.
	// Accepts 3 arguments:
	// 1. The socket you would like to connect to.
	// 2. A room name that will inform the server which room to create/join.
	// 3. A callback that is invoked when the connect event is received
	// (happens once on first connect to socket).
	var mobileRoomSetup = function mobileRoomSetup(socket, room, callback) {
	  socket.on('connect', function () {
	    socket.emit('createRoom', room);
	    if (callback) callback();
	  });
	};
	
	module.exports = mobileRoomSetup;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	// Attach to a tappable element and it will emit the tap event.
	// Accepts 3 arguments:
	// 1. The socket you would like to connect to as the first parameter.
	// 2. Accepts a room name that will inform the server which room to emit the tap event to.
	// 3. A callback function that will be run every time the tap event is triggered.
	// TODO: remove hard coded socket and room.
	function mobileTapShare(socket, room, callback) {
	  imperio.socket.emit('tap', imperio.room);
	  if (callback) callback();
	}
	
	module.exports = mobileTapShare;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	(function (g, f) {
	  'use strict';
	  var h = function h(e) {
	    if ("object" !== _typeof(e.document)) throw Error("Cookies.js requires a `window` with a `document` object");var b = function b(a, d, c) {
	      return 1 === arguments.length ? b.get(a) : b.set(a, d, c);
	    };b._document = e.document;b._cacheKeyPrefix = "cookey.";b._maxExpireDate = new Date("Fri, 31 Dec 9999 23:59:59 UTC");b.defaults = { path: "/", secure: !1 };b.get = function (a) {
	      b._cachedDocumentCookie !== b._document.cookie && b._renewCache();a = b._cache[b._cacheKeyPrefix + a];return a === f ? f : decodeURIComponent(a);
	    };
	    b.set = function (a, d, c) {
	      c = b._getExtendedOptions(c);c.expires = b._getExpiresDate(d === f ? -1 : c.expires);b._document.cookie = b._generateCookieString(a, d, c);return b;
	    };b.expire = function (a, d) {
	      return b.set(a, f, d);
	    };b._getExtendedOptions = function (a) {
	      return { path: a && a.path || b.defaults.path, domain: a && a.domain || b.defaults.domain, expires: a && a.expires || b.defaults.expires, secure: a && a.secure !== f ? a.secure : b.defaults.secure };
	    };b._isValidDate = function (a) {
	      return "[object Date]" === Object.prototype.toString.call(a) && !isNaN(a.getTime());
	    };
	    b._getExpiresDate = function (a, d) {
	      d = d || new Date();"number" === typeof a ? a = Infinity === a ? b._maxExpireDate : new Date(d.getTime() + 1E3 * a) : "string" === typeof a && (a = new Date(a));if (a && !b._isValidDate(a)) throw Error("`expires` parameter cannot be converted to a valid Date instance");return a;
	    };b._generateCookieString = function (a, b, c) {
	      a = a.replace(/[^#$&+\^`|]/g, encodeURIComponent);a = a.replace(/\(/g, "%28").replace(/\)/g, "%29");b = (b + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);c = c || {};a = a + "=" + b + (c.path ? ";path=" + c.path : "");a += c.domain ? ";domain=" + c.domain : "";a += c.expires ? ";expires=" + c.expires.toUTCString() : "";return a += c.secure ? ";secure" : "";
	    };b._getCacheFromString = function (a) {
	      var d = {};a = a ? a.split("; ") : [];for (var c = 0; c < a.length; c++) {
	        var e = b._getKeyValuePairFromCookieString(a[c]);d[b._cacheKeyPrefix + e.key] === f && (d[b._cacheKeyPrefix + e.key] = e.value);
	      }return d;
	    };b._getKeyValuePairFromCookieString = function (a) {
	      var b = a.indexOf("="),
	          b = 0 > b ? a.length : b,
	          c = a.substr(0, b),
	          e;try {
	        e = decodeURIComponent(c);
	      } catch (f) {
	        console && "function" === typeof console.error && console.error('Could not decode cookie with key "' + c + '"', f);
	      }return { key: e, value: a.substr(b + 1) };
	    };b._renewCache = function () {
	      b._cache = b._getCacheFromString(b._document.cookie);b._cachedDocumentCookie = b._document.cookie;
	    };b._areEnabled = function () {
	      var a = "1" === b.set("cookies.js", 1).get("cookies.js");b.expire("cookies.js");return a;
	    };b.enabled = b._areEnabled();return b;
	  },
	      e = "object" === _typeof(g.document) ? h(g) : h; true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return e;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" === (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? ("object" === (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" === _typeof(module.exports) && (exports = module.exports = e), exports.Cookies = e) : g.Cookies = e;
	})("undefined" === typeof window ? undefined : window);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _cookiesMin = __webpack_require__(9);
	
	var _cookiesMin2 = _interopRequireDefault(_cookiesMin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Uses cookies-js to retrieve the cookie with the associated name.
	// Required to display the nonce for mobile connections and to pull the roomID
	// that sockets uses to establish the correct room.
	function getCookie(name) {
	  return _cookiesMin2.default.get(name);
	}
	
	module.exports = getCookie;

/***/ }
/******/ ]);
//# sourceMappingURL=imperio.js.map