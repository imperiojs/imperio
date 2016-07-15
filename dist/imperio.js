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

	'use strict'; // eslint-disable-line
	// import our getCookie function which we will use to pull
	// out the roomID and nonce cookie for socket connection and display on client
	
	var _getCookie = __webpack_require__(24);
	
	var _getCookie2 = _interopRequireDefault(_getCookie);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import io from 'socket.io';
	// initialize library storage object
	var imperio = {};
	// instantiate our shared socket
	imperio.socket = io(); // eslint-disable-line // HACK - is dependency on CDN OK?
	// store roomID to pass to server for room creation and correctly routing the emissions
	imperio.room = (0, _getCookie2.default)('roomId');
	// store nonce to use to display and show mobile user how to connect
	imperio.nonce = (0, _getCookie2.default)('nonce');
	// check if webRTC is supported by client imperio.webRTCSupport will be true or false
	imperio.webRTCSupport = __webpack_require__(28);
	// ICE server config, will remove
	// TODO: set this to ENV variables
	imperio.webRTCConfiguration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
	// initiate webRTC connection
	imperio.webRTCConnect = __webpack_require__(27);
	// will store the dataChannel where webRTC data will be passed
	imperio.dataChannel = null;
	// peerConnection stored on imperio
	imperio.peerConnection = null;
	// distinguish if device is setting up or joining a webRTC
	// imperio.isInitiator = null;
	// take a tap event and emit the tap event
	imperio.mobileTapShare = __webpack_require__(20);
	// sets up listener for motion data and emits object containing x,y,z coords
	imperio.mobileAccelShare = __webpack_require__(13);
	// sets up a listener for location data and emits object containing coordinates and time
	imperio.mobileLocationShare = __webpack_require__(16);
	// take a swipe event and emits that to  server/desktop: swiperight,swipeleft,swipeup,swipedown
	// This is done with the help of HammerJS
	imperio.mobileSwipeShare = __webpack_require__(19);
	// sets up a listener for orientation data and emits object containing alpha, beta, and gamma data
	imperio.mobileGyroShare = __webpack_require__(14);
	// modified gyro share to detect time of emission
	imperio.mobileGyroTimer = __webpack_require__(15);
	// establishes connection to socket and shares room it should connnect to
	imperio.mobileRoomSetup = __webpack_require__(17);
	// sets up listener for changes to client connections to the room
	imperio.mobileRoomUpdate = __webpack_require__(18);
	// emits socket event to request nonce timeout data
	imperio.requestNonceTimeout = __webpack_require__(21);
	// sets up listener for tap event on desktop
	imperio.desktopTapHandler = __webpack_require__(11);
	// sets up listener for accel event/data on desktop
	imperio.desktopLocationHandler = __webpack_require__(7);
	// sets up listener for location event/data on desktop
	imperio.desktopAccelHandler = __webpack_require__(4);
	// sets up listener for gyro event/data on desktop
	imperio.desktopGyroHandler = __webpack_require__(5);
	// modified gyrohandler to detect time between emit and receive
	imperio.desktopGyroTimer = __webpack_require__(6);
	//
	imperio.desktopSwipeHandler = __webpack_require__(10);
	// establishes connection to socket and shares room it should connnect to
	imperio.desktopRoomSetup = __webpack_require__(8);
	// sets up listener for changes to client connections to the room
	imperio.desktopRoomUpdate = __webpack_require__(9);
	// sends updates on nonce timeouts to the browser
	imperio.nonceTimeoutUpdate = __webpack_require__(12);
	// attaches our library object to the window so it is accessible when we use the script tag
	window.imperio = imperio;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (err) {
	  return console.log(err.toString(), err);
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sendMessage = __webpack_require__(3);
	var logError = __webpack_require__(1);
	
	var onLocalSessionCreated = function onLocalSessionCreated(desc) {
	  imperio.peerConnection.setLocalDescription(desc, function () {
	    sendMessage(imperio.peerConnection.localDescription);
	  }, logError);
	};
	
	module.exports = onLocalSessionCreated;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var sendMessage = function sendMessage(message) {
	  console.log('Client sending message: ' + message);
	  imperio.socket.emit('message', message, imperio.room);
	};
	
	module.exports = sendMessage;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for the acceleration event and expects to receive an object
	// with the acceleration data in the form of {x: x, y:y, z:z}.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the acceleration event is triggered.
	var desktopAccelHandler = function desktopAccelHandler(callback) {
	  if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
	    imperio.dataChannel.onmessage = function (event) {
	      var eventObject = JSON.parse(event.data);
	      if (eventObject.type === 'acceleration') {
	        if (callback) callback(eventObject);
	      }
	    };
	  } else {
	    imperio.socket.on('acceleration', function (accObject) {
	      if (callback) callback(accObject);
	    });
	  }
	};
	
	module.exports = desktopAccelHandler;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for the orientation data and expects to receive an object
	// with the gyroscope data in the form of {alpha: alpha, beta:beta, gamma:gamma}.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the gyroscope event is triggered.
	var desktopGyroHandler = function desktopGyroHandler(callback) {
	  if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
	    imperio.dataChannel.onmessage = function (event) {
	      var eventObject = JSON.parse(event.data);
	      if (eventObject.type === 'gyroscope') {
	        if (callback) callback(eventObject);
	      }
	    };
	  } else {
	    imperio.socket.on('gyroscope', function (gyroObject) {
	      if (callback) callback(gyroObject);
	    });
	  }
	};
	
	module.exports = desktopGyroHandler;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var desktopGyroTimer = function desktopGyroTimer(callback) {
	  imperio.socket.on('gyroscopeTimer', function (gyroObj, emitDate, serverDate) {
	    if (callback) callback(gyroObj, emitDate, serverDate);
	  });
	};
	
	module.exports = desktopGyroTimer;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for the location data and expects to receive an object
	// with the location data in the form of {cords: {accuracy:21, altitude:null,
	// altitudeAccuracy:null, heading:null, latitude:33.9794281, longitude:-118.42238250000001,
	// speed:null}, }.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the location event is triggered.
	var desktopLocationHandler = function desktopLocationHandler(callback) {
	  if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
	    imperio.dataChannel.onmessage = function (event) {
	      var eventObject = JSON.parse(event.data);
	      if (eventObject.type === 'location') {
	        if (callback) callback(eventObject);
	      }
	    };
	  } else {
	    imperio.socket.on('geoLocation', function (locationObj) {
	      if (callback) callback(locationObj);
	    });
	  }
	};
	
	module.exports = desktopLocationHandler;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	// Establishes a connection to the socket and shares the room it should connnect to.
	// Accepts 3 arguments:
	// 1. The socket you would like to connect to.
	// 2. A room name that will inform the server which room to create/join.
	// 3. A callback that is invoked when the connect event is received
	// (happens once on first connect to socket).
	// TODO Is this true? the callback is invoked after the msg is emitted, but
	//   there's no guarantee that the server got it...
	var desktopRoomSetup = function desktopRoomSetup(socket, room, callback) {
	  socket.on('connect', function () {
	    // only attempt to join room if room is defined in cookie and passed here
	    if (room) {
	      var clientData = {
	        room: room,
	        id: socket.id,
	        role: 'receiver'
	      };
	      socket.emit('createRoom', clientData);
	    }
	    if (callback) callback();
	  });
	};
	
	module.exports = desktopRoomSetup;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for updates to client connections to the room.
	// Accepts 2 arguments:
	// 1. The connection socket
	// 2. A callback function to handle the roomData object passed with the event
	var desktopRoomUpdate = function desktopRoomUpdate(socket, callback) {
	  socket.on('updateRoomData', function (roomData) {
	    if (callback) callback(roomData);
	  });
	};
	
	module.exports = desktopRoomUpdate;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var desktopSwipeHandler = {};
	
	desktopSwipeHandler.left = function (socket, callback) {
	  socket.on('swipeleft', function () {
	    if (callback) callback();
	  });
	};
	
	desktopSwipeHandler.right = function (socket, callback) {
	  socket.on('swiperight', function () {
	    if (callback) callback();
	  });
	};
	
	desktopSwipeHandler.up = function (socket, callback) {
	  socket.on('swipeup', function () {
	    if (callback) callback();
	  });
	};
	
	desktopSwipeHandler.down = function (socket, callback) {
	  socket.on('swipedown', function () {
	    if (callback) callback();
	  });
	};
	
	module.exports = desktopSwipeHandler;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Sets up a listener for a tap event on the desktop.
	 * @param {Object} socket - The socket you would like to connect to
	 * @param {function} callback - A callback function
	 *        that will be run every time the tap event is triggered
	 */
	var desktopTapHandler = function desktopTapHandler(socket, callback) {
	  if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
	    console.log('inside WebRTC part of tap handler');
	    imperio.dataChannel.onmessage = function (event) {
	      if (event.data === 'tap') {
	        if (callback) callback();
	      }
	    };
	  } else {
	    console.log('inside socket part of tap handler');
	    socket.on('tap', function () {
	      if (callback) callback();
	    });
	  }
	};
	
	module.exports = desktopTapHandler;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	// Establishes a connection to the socket and shares the room it should connnect to.
	// Accepts 3 arguments:
	// 1. The socket you would like to connect to.
	// 2. A room name that will inform the server which room to create/join.
	// 3. A callback that is invoked when the connect event is received
	var nonceTimeoutUpdate = function nonceTimeoutUpdate(socket, callback) {
	  socket.on('updateNonceTimeouts', function (nonceTimeouts) {
	    if (callback) callback(nonceTimeouts);
	  });
	};
	
	module.exports = nonceTimeoutUpdate;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	// Adds a listener to the window on the mobile device in order to read the accelerometer data.
	// Will send accelerometer data to the socket in the form of {x: x, y:y, z:z}.
	// Accepts 3 arguments:
	// 1. The socket you would like to connect to as the first parameter.
	// 2. A room name that will inform the server which room to emit the acceleration event and data to.
	// 4. A callback function that will be run every time the tap event is triggered, by default
	// we will provide this function with the accelerometer data.
	var mobileAccelShare = {};
	
	mobileAccelShare.gravity = function (callback) {
	  window.ondevicemotion = function (event) {
	    var x = Math.round(event.accelerationIncludingGravity.x);
	    var y = Math.round(event.accelerationIncludingGravity.y);
	    var z = Math.round(event.accelerationIncludingGravity.z);
	    var accObject = {
	      type: 'acceleration',
	      x: x,
	      y: y,
	      z: z
	    };
	    if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
	      imperio.dataChannel.send(JSON.stringify(accObject));
	    } else imperio.socket.emit('acceleration', imperio.room, accObject);
	    if (callback) callback(accObject);
	  };
	};
	
	mobileAccelShare.noGravity = function (socket, room, callback) {
	  window.ondevicemotion = function (event) {
	    var x = Math.round(event.acceleration.x);
	    var y = Math.round(event.acceleration.y);
	    var z = Math.round(event.acceleration.z);
	    var accObject = {
	      type: 'acceleration',
	      x: x,
	      y: y,
	      z: z
	    };
	    if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
	      imperio.dataChannel.send(JSON.stringify(accObject));
	    } else imperio.socket.emit('acceleration', imperio.room, accObject);
	    if (callback) callback(accObject);
	  };
	};
	
	module.exports = mobileAccelShare;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	// Adds a listener to the window on the mobile device in order to read the gyroscope data.
	// Will send gyroscope data to the socket in the form of {alpha: alpha, beta:beta, gamma:gamma}.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the tap event is triggered, by default
	// we will provide this function with the gyroscope data.
	var mobileGyroShare = function mobileGyroShare(callback) {
	  window.ondeviceorientation = function (event) {
	    var alpha = Math.round(event.alpha);
	    var beta = Math.round(event.beta);
	    var gamma = Math.round(event.gamma);
	    var gyroObject = {
	      type: 'gyroscope',
	      alpha: alpha,
	      beta: beta,
	      gamma: gamma
	    };
	    if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
	      imperio.dataChannel.send(JSON.stringify(gyroObject));
	    } else imperio.socket.emit('gyroscope', imperio.room, gyroObject);
	    if (callback) callback(gyroObject);
	  };
	};
	
	module.exports = mobileGyroShare;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	var mobileGyroTimer = function mobileGyroTimer(callback) {
	  window.ondeviceorientation = function (event) {
	    var alpha = Math.round(event.alpha);
	    var beta = Math.round(event.beta);
	    var gamma = Math.round(event.gamma);
	    var gyroObject = {
	      alpha: alpha,
	      beta: beta,
	      gamma: gamma
	    };
	    var emitDate = Date.now();
	    imperio.socket.emit('gyroscopeTimer', imperio.room, gyroObject, emitDate);
	    if (callback) callback(gyroObject);
	  };
	};
	
	module.exports = mobileGyroTimer;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	* This emits to the specified room, the location of
	* @param The getCurrentPosition.coords property has several properties eg:
	*        accuracy,altitude, altitudeAccuracy, heading, latitude, longitude
	*        & speed
	*/
	var mobileLocationShare = function mobileLocationShare(callback) {
	  if (!navigator.geolocation) {
	    console.log('This browser does not support Geolocation');
	    return;
	  }
	  navigator.geolocation.getCurrentPosition(function (position) {
	    var locationObject = {
	      type: 'location',
	      coordinates: position.coords
	    };
	    if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
	      imperio.dataChannel.send(JSON.stringify(locationObject));
	    } else imperio.socket.emit('geoLocation', imperio.room, locationObject);
	    if (callback) callback(locationObject);
	  });
	};
	
	module.exports = mobileLocationShare;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	// Establishes a connection to the socket and shares the room it should connnect to.
	// Accepts 1 arguments:
	// 1. A callback that is invoked when the connect event is received
	// (happens once on first connect to socket).
	
	var mobileRoomSetup = function mobileRoomSetup(callback) {
	  imperio.socket.on('connect', function () {
	    // only attempt to join room if room is defined in cookie and passed here
	    if (imperio.room) {
	      var clientData = {
	        room: imperio.room,
	        id: imperio.socket.id,
	        role: 'emitter'
	      };
	      imperio.socket.emit('createRoom', clientData);
	    }
	    if (callback) callback(imperio.socket);
	  });
	};
	
	module.exports = mobileRoomSetup;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for updates to client connections to the room.
	// Accepts 2 arguments:
	// 1. The connection socket
	// 2. A callback function to handle the roomData object passed with the event
	var mobileRoomUpdate = function mobileRoomUpdate(socket, callback) {
	  socket.on('updateRoomData', function (roomData) {
	    if (callback) callback(roomData);
	  });
	};
	
	module.exports = mobileRoomUpdate;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	var mobileSwipeShare = {};
	
	mobileSwipeShare.left = function (socket, room, swipeElement, callback) {
	  // console.log("in mobileSwipe left");
	  new Hammer(swipeElement).on('swipeleft', function () {
	    swipeElement.innerHTML = "swiped-left has been emitted from Imperio";
	    socket.emit('swipeleft', room);
	    if (callback) callback();
	  });
	};
	
	mobileSwipeShare.right = function (socket, room, swipeElement, callback) {
	  // console.log("in mobileSwipe left");
	  new Hammer(swipeElement).on('swiperight', function () {
	    swipeElement.innerHTML = "swiped-right has been emitted from Imperio";
	    socket.emit('swiperight', room);
	    if (callback) callback();
	  });
	};
	
	mobileSwipeShare.up = function (socket, room, swipeElement, callback) {
	  // console.log("in mobileSwipe left");
	  new Hammer(swipeElement).on('swipeup', function () {
	    swipeElement.innerHTML = "swiped-up has been emitted from Imperio";
	    socket.emit('swipeup', room);
	    if (callback) callback();
	  });
	};
	//
	// mobileSwipeShare.down = (socket, room, swipeElement, callback) => {
	//   // console.log("in mobileSwipe left");
	//   new Hammer(swipeElement).on('swipedown', function(){
	//     swipeElement.innerHTML = "swipedup has been emitted from Imperio";
	//     socket.emit('swipedown', room);
	//     if (callback) callback();
	//   });
	// };
	module.exports = mobileSwipeShare;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	// Attach to a tappable element and it will emit the tap event.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the tap event is triggered.
	var mobileTapShare = function mobileTapShare(callback) {
	  if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
	    imperio.dataChannel.send('tap');
	  } else {
	    imperio.socket.emit('tap', imperio.room);
	  }
	  if (callback) callback();
	};
	
	module.exports = mobileTapShare;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	function requestNonceTimeout(socket, room, callback) {
	  imperio.socket.emit('updateNonceTimeouts', imperio.room);
	  if (callback) callback();
	}
	
	module.exports = requestNonceTimeout;

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sendMessage = __webpack_require__(3);
	var logError = __webpack_require__(1);
	var onDataChannelCreated = __webpack_require__(25);
	var onLocalSessionCreated = __webpack_require__(2);
	
	// const createPeerConnection
	module.exports = function (isInitiator, config) {
	  console.log('Creating Peer connection as initiator?', isInitiator, 'config:', config);
	  imperio.peerConnection = new RTCPeerConnection(config);
	  // send any ice candidates to the other peer
	  imperio.peerConnection.onicecandidate = function (event) {
	    console.log('icecandidate event:', event);
	    if (event.candidate) {
	      sendMessage({
	        type: 'candidate',
	        label: event.candidate.sdpMLineIndex,
	        id: event.candidate.sdpMid,
	        candidate: event.candidate.candidate
	      });
	    } else {
	      console.log('End of candidates.');
	    }
	  };
	  if (isInitiator) {
	    console.log('Creating Data Channel');
	    imperio.dataChannel = imperio.peerConnection.createDataChannel('phone data', { ordered: false, maxRetransmits: 0 });
	    onDataChannelCreated();
	    console.log('Creating an offer');
	    imperio.peerConnection.createOffer(onLocalSessionCreated, logError);
	  } else {
	    imperio.peerConnection.ondatachannel = function (event) {
	      console.log('ondatachannel:', event.channel);
	      imperio.dataChannel = event.channel;
	      onDataChannelCreated();
	    };
	  }
	};
	
	// module.export = createPeerConnection;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _cookiesMin = __webpack_require__(22);
	
	var _cookiesMin2 = _interopRequireDefault(_cookiesMin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Uses cookies-js to retrieve the cookie with the associated name.
	// Required to display the nonce for mobile connections and to pull the roomID
	// that sockets uses to establish the correct room.
	function getCookie(name) {
	  return _cookiesMin2.default.get(name);
	}
	
	module.exports = getCookie;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	var onDataChannelCreated = function onDataChannelCreated() {
	  if (imperio.channel) {
	    imperio.channel.onopen = function () {
	      console.log('CHANNEL opened!!!');
	    };
	  }
	};
	
	module.exports = onDataChannelCreated;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var logError = __webpack_require__(1);
	var onLocalSessionCreated = __webpack_require__(2);
	
	var signalingMessageCallback = function signalingMessageCallback(message) {
	  if (message.type === 'offer') {
	    console.log('Got offer. Sending answer to peer.');
	    imperio.peerConnection.setRemoteDescription(new RTCSessionDescription(message), function () {}, logError);
	    imperio.peerConnection.createAnswer(onLocalSessionCreated, logError);
	  } else if (message.type === 'answer') {
	    console.log('Got answer.');
	    imperio.peerConnection.setRemoteDescription(new RTCSessionDescription(message), function () {}, logError);
	  } else if (message.type === 'candidate') {
	    console.log('Setting candidate.');
	    imperio.peerConnection.addIceCandidate(new RTCIceCandidate({ candidate: message.candidate }));
	  } else if (message === 'bye') {
	    // TODO: do something when device disconnects?
	  }
	};
	
	module.exports = signalingMessageCallback;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createPeerConnection = __webpack_require__(23);
	var signalingMessageCallback = __webpack_require__(26);
	
	var webRTCConnect = function webRTCConnect() {
	  imperio.socket.on('created', function (room, clientId) {
	    console.log('Created room, ' + room + ' - my client ID is, ' + clientId);
	    var isInitiator = true;
	  });
	  imperio.socket.on('joined', function (room, clientId) {
	    console.log('This peer has joined room, ' + room + ', with client ID, ' + clientId);
	    var isInitiator = false;
	    createPeerConnection(isInitiator, imperio.webRTCConfiguration);
	  });
	  imperio.socket.on('ready', function () {
	    console.log('Socket is ready');
	    createPeerConnection(true, imperio.webRTCConfiguration);
	  });
	  imperio.socket.on('log', function (array) {
	    console.log.apply(console, array);
	  });
	  imperio.socket.on('message', function (message) {
	    console.log('Client received message: ' + message);
	    signalingMessageCallback(message);
	  });
	};
	
	module.exports = webRTCConnect;

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	var peerConnectionSupported = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	var getUserMediaSupported = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;
	
	// export whether the browser supports peerconnection and dataConnection
	module.exports = !!peerConnectionSupported && !!getUserMediaSupported;

/***/ }
/******/ ]);
//# sourceMappingURL=imperio.js.map