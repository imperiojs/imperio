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
	
	var _getCookie = __webpack_require__(28);
	
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
	imperio.webRTCSupport = __webpack_require__(4);
	// ICE server config, will remove
	// TODO: set this to ENV variables
	imperio.webRTCConfiguration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
	// determines if current connection is socket or rtc
	imperio.connectionType = null;
	// initiate webRTC connection
	imperio.webRTCConnect = __webpack_require__(31);
	// will store the dataChannel where webRTC data will be passed
	imperio.dataChannel = null;
	// peerConnection stored on imperio
	imperio.peerConnection = null;
	// storage place for pointers to callback functions passed into handler functions
	imperio.callbacks = {};
	// take a tap event and emit the tap event
	imperio.mobileTapShare = __webpack_require__(24);
	// sets up listener for motion data and emits object containing x,y,z coords
	imperio.mobileAccelShare = __webpack_require__(19);
	// sets up a listener for location data and emits object containing coordinates and time
	imperio.mobileGeoLocationShare = __webpack_require__(20);
	// sets up a listener for orientation data and emits object containing alpha, beta, and gamma data
	imperio.mobileGyroShare = __webpack_require__(21);
	// establishes connection to socket and shares room it should connnect to
	imperio.mobileRoomSetup = __webpack_require__(22);
	// sets up listener for changes to client connections to the room
	imperio.mobileRoomUpdate = __webpack_require__(23);
	// emits socket event to request nonce timeout data
	imperio.requestNonceTimeout = __webpack_require__(25);
	// sets up listener for tap event on desktop
	imperio.desktopTapHandler = __webpack_require__(10);
	// sets up listener for accel event/data on desktop
	imperio.desktopGeoLocationHandler = __webpack_require__(6);
	// sets up listener for location event/data on desktop
	imperio.desktopAccelHandler = __webpack_require__(5);
	// sets up listener for gyro event/data on desktop
	imperio.desktopGyroHandler = __webpack_require__(7);
	// establishes connection to socket and shares room it should connnect to
	imperio.desktopRoomSetup = __webpack_require__(8);
	
	imperio.curse = __webpack_require__(12);
	var events = ['pan', 'pinch', 'press', 'pressUp', 'rotate', 'swipe'];
	events.forEach(function (event) {
	  var eventHandler = 'desktop' + (event[0].toUpperCase() + event.substring(1)) + 'Handler';
	  imperio[eventHandler] = function (callback) {
	    imperio.callbacks[event] = callback;
	    imperio.socket.on(event, function (eventObject) {
	      if (callback) callback(eventObject);
	    });
	  };
	});
	// sets up listener for changes to client connections to the room
	imperio.desktopRoomUpdate = __webpack_require__(9);
	// sends updates on nonce timeouts to the browser
	imperio.nonceTimeoutUpdate = __webpack_require__(11);
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

	"use strict";
	
	var peerConnectionSupported = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	var getUserMediaSupported = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;
	
	// export whether the browser supports peerconnection and dataConnection
	module.exports = !!peerConnectionSupported && !!getUserMediaSupported;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for the acceleration event and expects to receive an object
	// with the acceleration data in the form of {x: x, y:y, z:z}.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the acceleration event is triggered.
	var desktopAccelHandler = function desktopAccelHandler(callback) {
	  imperio.callbacks.acceleration = callback;
	  imperio.socket.on('acceleration', function (accObject) {
	    if (callback) callback(accObject);
	  });
	};
	
	module.exports = desktopAccelHandler;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for the location data and expects to receive an object
	// with the location data in the form of {cords: {accuracy:21, altitude:null,
	// altitudeAccuracy:null, heading:null, latitude:33.9794281, longitude:-118.42238250000001,
	// speed:null}, }.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the location event is triggered.
	var desktopGeoLocationHandler = function desktopGeoLocationHandler(callback) {
	  imperio.callbacks.geoLocation = callback;
	  imperio.socket.on('geoLocation', function (locationObj) {
	    if (callback) callback(locationObj);
	  });
	};
	
	module.exports = desktopGeoLocationHandler;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for the orientation data and expects to receive an object
	// with the gyroscope data in the form of {alpha: alpha, beta:beta, gamma:gamma}.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the gyroscope event is triggered.
	var desktopGyroHandler = function desktopGyroHandler(callback) {
	  imperio.callbacks.gyroscope = callback;
	  imperio.socket.on('gyroscope', function (gyroObject) {
	    if (callback) callback(gyroObject);
	  });
	};
	
	module.exports = desktopGyroHandler;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	// Establishes a connection to the socket and shares the room it should connnect to.
	// Accepts 1 argument:
	// 1. A callback that is invoked when the connect event is received
	// (happens once on first connect to socket).
	var desktopRoomSetup = function desktopRoomSetup(callback) {
	  imperio.socket.on('connect', function () {
	    // only attempt to join room if room is defined in cookie and passed here
	    imperio.connectionType = 'sockets';
	    if (imperio.room) {
	      var clientData = {
	        room: imperio.room,
	        id: imperio.socket.id,
	        role: 'receiver'
	      };
	      imperio.socket.emit('createRoom', clientData);
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
	var desktopRoomUpdate = function desktopRoomUpdate(callback) {
	  imperio.socket.on('updateRoomData', function (roomData) {
	    if (callback) callback(roomData);
	  });
	};
	
	module.exports = desktopRoomUpdate;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Sets up a listener for a tap event on the desktop.
	 * @param {Object} socket - The socket you would like to connect to
	 * @param {function} callback - A callback function
	 *        that will be run every time the tap event is triggered
	 */
	var desktopTapHandler = function desktopTapHandler(callback) {
	  imperio.callbacks.tap = callback;
	  imperio.socket.on('tap', function () {
	    if (callback) callback();
	  });
	};
	
	module.exports = desktopTapHandler;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	// Establishes a connection to the socket and shares the room it should connnect to.
	// Accepts 3 arguments:
	// 1. The socket you would like to connect to.
	// 2. A room name that will inform the server which room to create/join.
	// 3. A callback that is invoked when the connect event is received
	var nonceTimeoutUpdate = function nonceTimeoutUpdate(callback) {
	  imperio.socket.on('updateNonceTimeouts', function (nonceTimeouts) {
	    if (callback) callback(nonceTimeouts);
	  });
	};
	
	module.exports = nonceTimeoutUpdate;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var panEmitter = __webpack_require__(13);
	var pinchEmitter = __webpack_require__(14);
	var pressEmitter = __webpack_require__(15);
	var pressUpEmitter = __webpack_require__(16);
	var rotateEmitter = __webpack_require__(17);
	var swipeEmitter = __webpack_require__(18);
	
	function curse(action, element, localCallback, modifyDataCallback) {
	  if (action === 'pan') panEmitter(element, localCallback, modifyDataCallback);
	  if (action === 'pinch') pinchEmitter(element, localCallback, modifyDataCallback);
	  if (action === 'press') pressEmitter(element, localCallback, modifyDataCallback);
	  if (action === 'pressUp') pressUpEmitter(element, localCallback, modifyDataCallback);
	  if (action === 'rotate') rotateEmitter(element, localCallback, modifyDataCallback);
	  if (action === 'swipe') swipeEmitter(element, localCallback, modifyDataCallback);
	}
	
	module.exports = curse;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	var panEmitter = function panEmitter(element, localCallback, modifyDataCallback) {
	  var hammertime = new Hammer(element);
	  hammertime.on('pan', function (event) {
	    event.start = false;
	    event.end = false;
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'pan';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('pan', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	  hammertime.on('panstart', function (event) {
	    event.start = true;
	    event.end = false;
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'pan';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('pan', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	  hammertime.on('panend', function (event) {
	    event.start = false;
	    event.end = true;
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'pan';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('pan', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	};
	
	module.exports = panEmitter;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	var pinchEmitter = function pinchEmitter(element, localCallback, modifyDataCallback) {
	  var hammertime = new Hammer(element);
	  hammertime.get('pinch').set({ enable: true });
	  hammertime.on('pinch', function (event) {
	    event.start = false;
	    event.end = false;
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'pinch';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('pinch', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	  hammertime.on('pinchstart', function (event) {
	    event.start = true;
	    event.end = false;
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'pinch';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('pinch', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	  hammertime.on('pinchend', function (event) {
	    event.start = false;
	    event.end = true;
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'pinch';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('pinch', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	};
	
	module.exports = pinchEmitter;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	var pressEmitter = function pressEmitter(element, localCallback, modifyDataCallback) {
	  var hammertime = new Hammer(element);
	  hammertime.on('press', function (event) {
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'press';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('press', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	};
	
	module.exports = pressEmitter;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	var pressUpEmitter = function pressUpEmitter(element, localCallback, modifyDataCallback) {
	  var hammertime = new Hammer(element);
	  hammertime.on('pressup', function (event) {
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'pressUp';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('pressUp', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	};
	
	module.exports = pressUpEmitter;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	var rotateEmitter = function rotateEmitter(element, localCallback, modifyDataCallback) {
	  var hammertime = new Hammer(element);
	  hammertime.get('rotate').set({ enable: true });
	  hammertime.on('rotate', function (event) {
	    event.start = false;
	    event.end = false;
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'rotate';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('rotate', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	  hammertime.on('rotatestart', function (event) {
	    event.start = true;
	    event.end = false;
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'rotate';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('rotate', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	  hammertime.on('rotateend', function (event) {
	    event.start = false;
	    event.end = true;
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    event.type = 'rotate';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('rotate', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	};
	
	module.exports = rotateEmitter;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	var swipeEmitter = function swipeEmitter(element, localCallback, modifyDataCallback) {
	  var hammertime = new Hammer(element);
	  hammertime.on('swipe', function (event) {
	    event.start = true;
	    event.end = true;
	    if (modifyDataCallback) event = modifyDataCallback(event);
	    // event.type = 'swipe';
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(event));
	    } else imperio.socket.emit('swipe', imperio.room, event);
	    if (localCallback) localCallback(event);
	  });
	};
	
	module.exports = swipeEmitter;

/***/ },
/* 19 */
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
	
	mobileAccelShare.gravity = function (localCallback, modifyDataCallback) {
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
	    if (modifyDataCallback) accObject = modifyDataCallback(accObject);
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(accObject));
	    } else imperio.socket.emit('acceleration', imperio.room, accObject);
	    if (localCallback) localCallback(accObject);
	  };
	};
	
	mobileAccelShare.noGravity = function (localCallback, modifyDataCallback) {
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
	    if (modifyDataCallback) accObject = modifyDataCallback(accObject);
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(accObject));
	    } else imperio.socket.emit('acceleration', imperio.room, accObject);
	    if (localCallback) localCallback(accObject);
	  };
	};
	
	module.exports = mobileAccelShare;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	* This emits to the specified room, the location of
	* @param The getCurrentPosition.coords property has several properties eg:
	*        accuracy,altitude, altitudeAccuracy, heading, latitude, longitude
	*        & speed
	*/
	
	var mobileGeoLocationShare = function mobileGeoLocationShare(callback) {
	  if (!navigator.geolocation) {
	    console.log('This browser does not support Geolocation');
	    return;
	  }
	  navigator.geolocation.getCurrentPosition(function (position) {
	    var geoLocationObject = {
	      type: 'geoLocation',
	      coordinates: position.coords
	    };
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(geoLocationObject));
	    } else imperio.socket.emit('geoLocation', imperio.room, geoLocationObject);
	    if (callback) callback(geoLocationObject);
	  });
	};
	
	module.exports = mobileGeoLocationShare;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	// Adds a listener to the window on the mobile device in order to read the gyroscope data.
	// Will send gyroscope data to the socket in the form of {alpha: alpha, beta:beta, gamma:gamma}.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the tap event is triggered, by default
	// we will provide this function with the gyroscope data.
	var mobileGyroShare = function mobileGyroShare(localCallback, modifyDataCallback) {
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
	    if (modifyDataCallback) gyroObject = modifyDataCallback(gyroObject);
	    if (imperio.connectionType === 'webRTC') {
	      imperio.dataChannel.send(JSON.stringify(gyroObject));
	    } else imperio.socket.emit('gyroscope', imperio.room, gyroObject);
	    if (localCallback) localCallback(gyroObject);
	  };
	};
	
	module.exports = mobileGyroShare;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	// Establishes a connection to the socket and shares the room it should connnect to.
	// Accepts 1 arguments:
	// 1. A callback that is invoked when the connect event is received
	// (happens once on first connect to socket).
	
	var mobileRoomSetup = function mobileRoomSetup(callback) {
	  imperio.socket.on('connect', function () {
	    // only attempt to join room if room is defined in cookie and passed here
	    imperio.connectionType = 'sockets';
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
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for updates to client connections to the room.
	// Accepts 1 argument:
	// 1. A callback function to handle the roomData object passed with the event
	var mobileRoomUpdate = function mobileRoomUpdate(callback) {
	  imperio.socket.on('updateRoomData', function (roomData) {
	    if (callback) callback(roomData);
	  });
	};
	
	module.exports = mobileRoomUpdate;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	// Attach to a tappable element and it will emit the tap event.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the tap event is triggered.
	var mobileTapShare = function mobileTapShare(callback) {
	  if (imperio.connectionType === 'webRTC') {
	    imperio.dataChannel.send('tap');
	  } else {
	    imperio.socket.emit('tap', imperio.room);
	  }
	  if (callback) callback();
	};
	
	module.exports = mobileTapShare;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	var requestNonceTimeout = function requestNonceTimeout(callback) {
	  imperio.socket.emit('updateNonceTimeouts', imperio.room);
	  if (callback) callback();
	};
	
	module.exports = requestNonceTimeout;

/***/ },
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sendMessage = __webpack_require__(3);
	var logError = __webpack_require__(1);
	var onDataChannelCreated = __webpack_require__(29);
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _cookiesMin = __webpack_require__(26);
	
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
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	var onDataChannelCreated = function onDataChannelCreated() {
	  if (imperio.dataChannel) {
	    imperio.dataChannel.onopen = function () {
	      console.log('CHANNEL opened!!!');
	      imperio.connectionType = 'webRTC';
	      imperio.dataChannel.onmessage = function (event) {
	        var eventObject = JSON.parse(event.data);
	        if (eventObject.type === 'acceleration') {
	          delete eventObject.type;
	          if (imperio.callbacks.acceleration) imperio.callbacks.acceleration(eventObject);
	        }
	        if (eventObject.type === 'gyroscope') {
	          delete eventObject.type;
	          if (imperio.callbacks.gyroscope) imperio.callbacks.gyroscope(eventObject);
	        }
	        if (eventObject.type === 'geoLocation') {
	          delete eventObject.type;
	          if (imperio.callbacks.geoLocation) imperio.callbacks.geoLocation(eventObject);
	        }
	        if (eventObject === 'tap') {
	          if (imperio.callbacks.tap) imperio.callbacks.tap();
	        }
	        if (eventObject.type === 'pan') {
	          delete eventObject.type;
	          if (imperio.callbacks.pan) imperio.callbacks.pan(eventObject);
	        }
	        if (eventObject.type === 'pinch') {
	          delete eventObject.type;
	          if (imperio.callbacks.pinch) imperio.callbacks.pinch(eventObject);
	        }
	        if (eventObject.type === 'press') {
	          delete eventObject.type;
	          if (imperio.callbacks.press) imperio.callbacks.press(eventObject);
	        }
	        if (eventObject.type === 'pressUp') {
	          delete eventObject.type;
	          if (imperio.callbacks.pressUp) imperio.callbacks.pressUp(eventObject);
	        }
	        if (eventObject.type === 'rotate') {
	          delete eventObject.type;
	          if (imperio.callbacks.rotate) imperio.callbacks.rotate(eventObject);
	        }
	        if (eventObject.type === 'swipe') {
	          delete eventObject.type;
	          if (imperio.callbacks.swipe) imperio.callbacks.swipe(eventObject);
	        }
	
	        // TODO: Add callbacks to imperio object
	        // TODO: modify all the handlers to remove webRTC and save the callbacks
	        // TODO: Modifly all sharing functions to have to callbacks, dataFunction and localFunction
	        // TODO: dataFunction will modify the data to be emitted and then that same modified data will be used for the localFunction Callback.
	      };
	    };
	  }
	};
	
	module.exports = onDataChannelCreated;

/***/ },
/* 30 */
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createPeerConnection = __webpack_require__(27);
	var signalingMessageCallback = __webpack_require__(30);
	var webRTCSupport = __webpack_require__(4);
	
	var webRTCConnect = function webRTCConnect() {
	  if (webRTCSupport) {
	    imperio.socket.on('created', function (room, clientId) {
	      console.log('Created room, ' + room + ' - my client ID is, ' + clientId);
	    });
	    imperio.socket.on('log', function (array) {
	      console.log.apply(console, array);
	    });
	    imperio.socket.on('joined', function (room, clientId) {
	      console.log('This peer has joined room, ' + room + ', with client ID, ' + clientId);
	      createPeerConnection(false, imperio.webRTCConfiguration);
	    });
	    imperio.socket.on('ready', function () {
	      console.log('Socket is ready');
	      createPeerConnection(true, imperio.webRTCConfiguration);
	    });
	    imperio.socket.on('message', function (message) {
	      console.log('Client received message: ' + message);
	      signalingMessageCallback(message);
	    });
	  } else console.log('WebRTC is not supported, will continue using Sockets.');
	};
	
	module.exports = webRTCConnect;

/***/ }
/******/ ]);
//# sourceMappingURL=imperio.js.map