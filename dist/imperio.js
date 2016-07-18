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
	
	var _getCookie = __webpack_require__(29);
	
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
	imperio.webRTCSupport = __webpack_require__(33);
	// ICE server config, will remove
	// TODO: set this to ENV variables
	imperio.webRTCConfiguration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
	// initiate webRTC connection
	imperio.webRTCConnect = __webpack_require__(32);
	// will store the dataChannel where webRTC data will be passed
	imperio.dataChannel = null;
	// peerConnection stored on imperio
	imperio.peerConnection = null;
	// distinguish if device is setting up or joining a webRTC
	imperio.callbacks = {};
	// take a tap event and emit the tap event
	imperio.mobileTapShare = __webpack_require__(25);
	// sets up listener for motion data and emits object containing x,y,z coords
	imperio.mobileAccelShare = __webpack_require__(20);
	// sets up a listener for location data and emits object containing coordinates and time
	imperio.mobileGeoLocationShare = __webpack_require__(35);
	// sets up a listener for orientation data and emits object containing alpha, beta, and gamma data
	imperio.mobileGyroShare = __webpack_require__(21);
	// modified gyro share to detect time of emission
	imperio.mobileGyroTimer = __webpack_require__(22);
	// establishes connection to socket and shares room it should connnect to
	imperio.mobileRoomSetup = __webpack_require__(23);
	// sets up listener for changes to client connections to the room
	imperio.mobileRoomUpdate = __webpack_require__(24);
	// emits socket event to request nonce timeout data
	imperio.requestNonceTimeout = __webpack_require__(26);
	// sets up listener for tap event on desktop
	imperio.desktopTapHandler = __webpack_require__(9);
	// sets up listener for accel event/data on desktop
	imperio.desktopGeoLocationHandler = __webpack_require__(34);
	// sets up listener for location event/data on desktop
	imperio.desktopAccelHandler = __webpack_require__(5);
	// sets up listener for gyro event/data on desktop
	imperio.desktopGyroHandler = __webpack_require__(6);
	// establishes connection to socket and shares room it should connnect to
	imperio.desktopRoomSetup = __webpack_require__(7);
	
	imperio.curse = __webpack_require__(11);
	
	var events = ['pan', 'pinch', 'press', 'pressUp', 'rotate', 'rotateStart', 'rotateEnd', 'swipe'];
	events.forEach(function (event) {
	  var eventHandler = 'desktop' + (event[0].toUpperCase() + event.substring(1)) + 'Handler';
	  imperio[eventHandler] = function (callback) {
	    imperio.socket.on(event, function (eventObject) {
	      if (callback) callback(eventObject);
	    });
	  };
	});
	// sets up listener for changes to client connections to the room
	imperio.desktopRoomUpdate = __webpack_require__(8);
	// sends updates on nonce timeouts to the browser
	imperio.nonceTimeoutUpdate = __webpack_require__(10);
	// attaches our library object to the window so it is accessible when we use the script tag
	window.imperio = imperio;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*! Hammer.JS - v2.0.8 - 2016-04-23
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
	!function (a, b, c, d) {
	  "use strict";
	  function e(a, b, c) {
	    return setTimeout(j(a, c), b);
	  }function f(a, b, c) {
	    return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
	  }function g(a, b, c) {
	    var e;if (a) if (a.forEach) a.forEach(b, c);else if (a.length !== d) for (e = 0; e < a.length;) {
	      b.call(c, a[e], e, a), e++;
	    } else for (e in a) {
	      a.hasOwnProperty(e) && b.call(c, a[e], e, a);
	    }
	  }function h(b, c, d) {
	    var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";return function () {
	      var c = new Error("get-stack-trace"),
	          d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
	          f = a.console && (a.console.warn || a.console.log);return f && f.call(a.console, e, d), b.apply(this, arguments);
	    };
	  }function i(a, b, c) {
	    var d,
	        e = b.prototype;d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c);
	  }function j(a, b) {
	    return function () {
	      return a.apply(b, arguments);
	    };
	  }function k(a, b) {
	    return (typeof a === "undefined" ? "undefined" : _typeof(a)) == oa ? a.apply(b ? b[0] || d : d, b) : a;
	  }function l(a, b) {
	    return a === d ? b : a;
	  }function m(a, b, c) {
	    g(q(b), function (b) {
	      a.addEventListener(b, c, !1);
	    });
	  }function n(a, b, c) {
	    g(q(b), function (b) {
	      a.removeEventListener(b, c, !1);
	    });
	  }function o(a, b) {
	    for (; a;) {
	      if (a == b) return !0;a = a.parentNode;
	    }return !1;
	  }function p(a, b) {
	    return a.indexOf(b) > -1;
	  }function q(a) {
	    return a.trim().split(/\s+/g);
	  }function r(a, b, c) {
	    if (a.indexOf && !c) return a.indexOf(b);for (var d = 0; d < a.length;) {
	      if (c && a[d][c] == b || !c && a[d] === b) return d;d++;
	    }return -1;
	  }function s(a) {
	    return Array.prototype.slice.call(a, 0);
	  }function t(a, b, c) {
	    for (var d = [], e = [], f = 0; f < a.length;) {
	      var g = b ? a[f][b] : a[f];r(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
	    }return c && (d = b ? d.sort(function (a, c) {
	      return a[b] > c[b];
	    }) : d.sort()), d;
	  }function u(a, b) {
	    for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) {
	      if (c = ma[g], e = c ? c + f : b, e in a) return e;g++;
	    }return d;
	  }function v() {
	    return ua++;
	  }function w(b) {
	    var c = b.ownerDocument || b;return c.defaultView || c.parentWindow || a;
	  }function x(a, b) {
	    var c = this;this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
	      k(a.options.enable, [a]) && c.handler(b);
	    }, this.init();
	  }function y(a) {
	    var b,
	        c = a.options.inputClass;return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z);
	  }function z(a, b, c) {
	    var d = c.pointers.length,
	        e = c.changedPointers.length,
	        f = b & Ea && d - e === 0,
	        g = b & (Ga | Ha) && d - e === 0;c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
	  }function A(a, b) {
	    var c = a.session,
	        d = b.pointers,
	        e = d.length;c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);var f = c.firstInput,
	        g = c.firstMultiple,
	        h = g ? g.center : f.center,
	        i = b.center = E(d);b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);var j = F(b.deltaTime, b.deltaX, b.deltaY);b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);var k = a.element;o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
	  }function B(a, b) {
	    var c = b.center,
	        d = a.offsetDelta || {},
	        e = a.prevDelta || {},
	        f = a.prevInput || {};b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
	  }function C(a, b) {
	    var c,
	        e,
	        f,
	        g,
	        h = a.lastInterval || b,
	        i = b.timeStamp - h.timeStamp;if (b.eventType != Ha && (i > Da || h.velocity === d)) {
	      var j = b.deltaX - h.deltaX,
	          k = b.deltaY - h.deltaY,
	          l = F(i, j, k);e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b;
	    } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
	  }function D(a) {
	    for (var b = [], c = 0; c < a.pointers.length;) {
	      b[c] = { clientX: pa(a.pointers[c].clientX), clientY: pa(a.pointers[c].clientY) }, c++;
	    }return { timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY };
	  }function E(a) {
	    var b = a.length;if (1 === b) return { x: pa(a[0].clientX), y: pa(a[0].clientY) };for (var c = 0, d = 0, e = 0; b > e;) {
	      c += a[e].clientX, d += a[e].clientY, e++;
	    }return { x: pa(c / b), y: pa(d / b) };
	  }function F(a, b, c) {
	    return { x: b / a || 0, y: c / a || 0 };
	  }function G(a, b) {
	    return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma;
	  }function H(a, b, c) {
	    c || (c = Qa);var d = b[c[0]] - a[c[0]],
	        e = b[c[1]] - a[c[1]];return Math.sqrt(d * d + e * e);
	  }function I(a, b, c) {
	    c || (c = Qa);var d = b[c[0]] - a[c[0]],
	        e = b[c[1]] - a[c[1]];return 180 * Math.atan2(e, d) / Math.PI;
	  }function J(a, b) {
	    return I(b[1], b[0], Ra) + I(a[1], a[0], Ra);
	  }function K(a, b) {
	    return H(b[0], b[1], Ra) / H(a[0], a[1], Ra);
	  }function L() {
	    this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments);
	  }function M() {
	    this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
	  }function N() {
	    this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments);
	  }function O(a, b) {
	    var c = s(a.touches),
	        d = s(a.changedTouches);return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d];
	  }function P() {
	    this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments);
	  }function Q(a, b) {
	    var c = s(a.touches),
	        d = this.targetIds;if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];var e,
	        f,
	        g = s(a.changedTouches),
	        h = [],
	        i = this.target;if (f = c.filter(function (a) {
	      return o(a.target, i);
	    }), b === Ea) for (e = 0; e < f.length;) {
	      d[f[e].identifier] = !0, e++;
	    }for (e = 0; e < g.length;) {
	      d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++;
	    }return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0;
	  }function R() {
	    x.apply(this, arguments);var a = j(this.handler, this);this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = [];
	  }function S(a, b) {
	    a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b);
	  }function T(a) {
	    var b = a.changedPointers[0];if (b.identifier === this.primaryTouch) {
	      var c = { x: b.clientX, y: b.clientY };this.lastTouches.push(c);var d = this.lastTouches,
	          e = function e() {
	        var a = d.indexOf(c);a > -1 && d.splice(a, 1);
	      };setTimeout(e, cb);
	    }
	  }function U(a) {
	    for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
	      var e = this.lastTouches[d],
	          f = Math.abs(b - e.x),
	          g = Math.abs(c - e.y);if (db >= f && db >= g) return !0;
	    }return !1;
	  }function V(a, b) {
	    this.manager = a, this.set(b);
	  }function W(a) {
	    if (p(a, jb)) return jb;var b = p(a, kb),
	        c = p(a, lb);return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb;
	  }function X() {
	    if (!fb) return !1;var b = {},
	        c = a.CSS && a.CSS.supports;return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (d) {
	      b[d] = c ? a.CSS.supports("touch-action", d) : !0;
	    }), b;
	  }function Y(a) {
	    this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = [];
	  }function Z(a) {
	    return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "";
	  }function $(a) {
	    return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "";
	  }function _(a, b) {
	    var c = b.manager;return c ? c.get(a) : a;
	  }function aa() {
	    Y.apply(this, arguments);
	  }function ba() {
	    aa.apply(this, arguments), this.pX = null, this.pY = null;
	  }function ca() {
	    aa.apply(this, arguments);
	  }function da() {
	    Y.apply(this, arguments), this._timer = null, this._input = null;
	  }function ea() {
	    aa.apply(this, arguments);
	  }function fa() {
	    aa.apply(this, arguments);
	  }function ga() {
	    Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
	  }function ha(a, b) {
	    return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b);
	  }function ia(a, b) {
	    this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (a) {
	      var b = this.add(new a[0](a[1]));a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
	    }, this);
	  }function ja(a, b) {
	    var c = a.element;if (c.style) {
	      var d;g(a.options.cssProps, function (e, f) {
	        d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "";
	      }), b || (a.oldCssProps = {});
	    }
	  }function ka(a, c) {
	    var d = b.createEvent("Event");d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
	  }var la,
	      ma = ["", "webkit", "Moz", "MS", "ms", "o"],
	      na = b.createElement("div"),
	      oa = "function",
	      pa = Math.round,
	      qa = Math.abs,
	      ra = Date.now;la = "function" != typeof Object.assign ? function (a) {
	    if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");for (var b = Object(a), c = 1; c < arguments.length; c++) {
	      var e = arguments[c];if (e !== d && null !== e) for (var f in e) {
	        e.hasOwnProperty(f) && (b[f] = e[f]);
	      }
	    }return b;
	  } : Object.assign;var sa = h(function (a, b, c) {
	    for (var e = Object.keys(b), f = 0; f < e.length;) {
	      (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
	    }return a;
	  }, "extend", "Use `assign`."),
	      ta = h(function (a, b) {
	    return sa(a, b, !0);
	  }, "merge", "Use `assign`."),
	      ua = 1,
	      va = /mobile|tablet|ip(ad|hone|od)|android/i,
	      wa = "ontouchstart" in a,
	      xa = u(a, "PointerEvent") !== d,
	      ya = wa && va.test(navigator.userAgent),
	      za = "touch",
	      Aa = "pen",
	      Ba = "mouse",
	      Ca = "kinect",
	      Da = 25,
	      Ea = 1,
	      Fa = 2,
	      Ga = 4,
	      Ha = 8,
	      Ia = 1,
	      Ja = 2,
	      Ka = 4,
	      La = 8,
	      Ma = 16,
	      Na = Ja | Ka,
	      Oa = La | Ma,
	      Pa = Na | Oa,
	      Qa = ["x", "y"],
	      Ra = ["clientX", "clientY"];x.prototype = { handler: function handler() {}, init: function init() {
	      this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler);
	    }, destroy: function destroy() {
	      this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler);
	    } };var Sa = { mousedown: Ea, mousemove: Fa, mouseup: Ga },
	      Ta = "mousedown",
	      Ua = "mousemove mouseup";i(L, x, { handler: function handler(a) {
	      var b = Sa[a.type];b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: Ba, srcEvent: a }));
	    } });var Va = { pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha },
	      Wa = { 2: za, 3: Aa, 4: Ba, 5: Ca },
	      Xa = "pointerdown",
	      Ya = "pointermove pointerup pointercancel";a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, { handler: function handler(a) {
	      var b = this.store,
	          c = !1,
	          d = a.type.toLowerCase().replace("ms", ""),
	          e = Va[d],
	          f = Wa[a.pointerType] || a.pointerType,
	          g = f == za,
	          h = r(b, a.pointerId, "pointerId");e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1));
	    } });var Za = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
	      $a = "touchstart",
	      _a = "touchstart touchmove touchend touchcancel";i(N, x, { handler: function handler(a) {
	      var b = Za[a.type];if (b === Ea && (this.started = !0), this.started) {
	        var c = O.call(this, a, b);b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a });
	      }
	    } });var ab = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
	      bb = "touchstart touchmove touchend touchcancel";i(P, x, { handler: function handler(a) {
	      var b = ab[a.type],
	          c = Q.call(this, a, b);c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a });
	    } });var cb = 2500,
	      db = 25;i(R, x, { handler: function handler(a, b, c) {
	      var d = c.pointerType == za,
	          e = c.pointerType == Ba;if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
	        if (d) S.call(this, b, c);else if (e && U.call(this, c)) return;this.callback(a, b, c);
	      }
	    }, destroy: function destroy() {
	      this.touch.destroy(), this.mouse.destroy();
	    } });var eb = u(na.style, "touchAction"),
	      fb = eb !== d,
	      gb = "compute",
	      hb = "auto",
	      ib = "manipulation",
	      jb = "none",
	      kb = "pan-x",
	      lb = "pan-y",
	      mb = X();V.prototype = { set: function set(a) {
	      a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim();
	    }, update: function update() {
	      this.set(this.manager.options.touchAction);
	    }, compute: function compute() {
	      var a = [];return g(this.manager.recognizers, function (b) {
	        k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
	      }), W(a.join(" "));
	    }, preventDefaults: function preventDefaults(a) {
	      var b = a.srcEvent,
	          c = a.offsetDirection;if (this.manager.session.prevented) return void b.preventDefault();var d = this.actions,
	          e = p(d, jb) && !mb[jb],
	          f = p(d, lb) && !mb[lb],
	          g = p(d, kb) && !mb[kb];if (e) {
	        var h = 1 === a.pointers.length,
	            i = a.distance < 2,
	            j = a.deltaTime < 250;if (h && i && j) return;
	      }return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0;
	    }, preventSrc: function preventSrc(a) {
	      this.manager.session.prevented = !0, a.preventDefault();
	    } };var nb = 1,
	      ob = 2,
	      pb = 4,
	      qb = 8,
	      rb = qb,
	      sb = 16,
	      tb = 32;Y.prototype = { defaults: {}, set: function set(a) {
	      return la(this.options, a), this.manager && this.manager.touchAction.update(), this;
	    }, recognizeWith: function recognizeWith(a) {
	      if (f(a, "recognizeWith", this)) return this;var b = this.simultaneous;return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
	    }, dropRecognizeWith: function dropRecognizeWith(a) {
	      return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this);
	    }, requireFailure: function requireFailure(a) {
	      if (f(a, "requireFailure", this)) return this;var b = this.requireFail;return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this;
	    }, dropRequireFailure: function dropRequireFailure(a) {
	      if (f(a, "dropRequireFailure", this)) return this;a = _(a, this);var b = r(this.requireFail, a);return b > -1 && this.requireFail.splice(b, 1), this;
	    }, hasRequireFailures: function hasRequireFailures() {
	      return this.requireFail.length > 0;
	    }, canRecognizeWith: function canRecognizeWith(a) {
	      return !!this.simultaneous[a.id];
	    }, emit: function emit(a) {
	      function b(b) {
	        c.manager.emit(b, a);
	      }var c = this,
	          d = this.state;qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d));
	    }, tryEmit: function tryEmit(a) {
	      return this.canEmit() ? this.emit(a) : void (this.state = tb);
	    }, canEmit: function canEmit() {
	      for (var a = 0; a < this.requireFail.length;) {
	        if (!(this.requireFail[a].state & (tb | nb))) return !1;a++;
	      }return !0;
	    }, recognize: function recognize(a) {
	      var b = la({}, a);return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void (this.state = tb));
	    }, process: function process(a) {}, getTouchAction: function getTouchAction() {}, reset: function reset() {} }, i(aa, Y, { defaults: { pointers: 1 }, attrTest: function attrTest(a) {
	      var b = this.options.pointers;return 0 === b || a.pointers.length === b;
	    }, process: function process(a) {
	      var b = this.state,
	          c = a.eventType,
	          d = b & (ob | pb),
	          e = this.attrTest(a);return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb;
	    } }), i(ba, aa, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Pa }, getTouchAction: function getTouchAction() {
	      var a = this.options.direction,
	          b = [];return a & Na && b.push(lb), a & Oa && b.push(kb), b;
	    }, directionTest: function directionTest(a) {
	      var b = this.options,
	          c = !0,
	          d = a.distance,
	          e = a.direction,
	          f = a.deltaX,
	          g = a.deltaY;return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
	    }, attrTest: function attrTest(a) {
	      return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a));
	    }, emit: function emit(a) {
	      this.pX = a.deltaX, this.pY = a.deltaY;var b = $(a.direction);b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a);
	    } }), i(ca, aa, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {
	      return [jb];
	    }, attrTest: function attrTest(a) {
	      return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob);
	    }, emit: function emit(a) {
	      if (1 !== a.scale) {
	        var b = a.scale < 1 ? "in" : "out";a.additionalEvent = this.options.event + b;
	      }this._super.emit.call(this, a);
	    } }), i(da, Y, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function getTouchAction() {
	      return [hb];
	    }, process: function process(a) {
	      var b = this.options,
	          c = a.pointers.length === b.pointers,
	          d = a.distance < b.threshold,
	          f = a.deltaTime > b.time;if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset();else if (a.eventType & Ea) this.reset(), this._timer = e(function () {
	        this.state = rb, this.tryEmit();
	      }, b.time, this);else if (a.eventType & Ga) return rb;return tb;
	    }, reset: function reset() {
	      clearTimeout(this._timer);
	    }, emit: function emit(a) {
	      this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input)));
	    } }), i(ea, aa, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {
	      return [jb];
	    }, attrTest: function attrTest(a) {
	      return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob);
	    } }), i(fa, aa, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Na | Oa, pointers: 1 }, getTouchAction: function getTouchAction() {
	      return ba.prototype.getTouchAction.call(this);
	    }, attrTest: function attrTest(a) {
	      var b,
	          c = this.options.direction;return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga;
	    }, emit: function emit(a) {
	      var b = $(a.offsetDirection);b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
	    } }), i(ga, Y, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function getTouchAction() {
	      return [ib];
	    }, process: function process(a) {
	      var b = this.options,
	          c = a.pointers.length === b.pointers,
	          d = a.distance < b.threshold,
	          f = a.deltaTime < b.time;if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout();if (d && f && c) {
	        if (a.eventType != Ga) return this.failTimeout();var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
	            h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;var i = this.count % b.taps;if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () {
	          this.state = rb, this.tryEmit();
	        }, b.interval, this), ob) : rb;
	      }return tb;
	    }, failTimeout: function failTimeout() {
	      return this._timer = e(function () {
	        this.state = tb;
	      }, this.options.interval, this), tb;
	    }, reset: function reset() {
	      clearTimeout(this._timer);
	    }, emit: function emit() {
	      this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
	    } }), ha.VERSION = "2.0.8", ha.defaults = { domEvents: !1, touchAction: gb, enable: !0, inputTarget: null, inputClass: null, preset: [[ea, { enable: !1 }], [ca, { enable: !1 }, ["rotate"]], [fa, { direction: Na }], [ba, { direction: Na }, ["swipe"]], [ga], [ga, { event: "doubletap", taps: 2 }, ["tap"]], [da]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };var ub = 1,
	      vb = 2;ia.prototype = { set: function set(a) {
	      return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
	    }, stop: function stop(a) {
	      this.session.stopped = a ? vb : ub;
	    }, recognize: function recognize(a) {
	      var b = this.session;if (!b.stopped) {
	        this.touchAction.preventDefaults(a);var c,
	            d = this.recognizers,
	            e = b.curRecognizer;(!e || e && e.state & rb) && (e = b.curRecognizer = null);for (var f = 0; f < d.length;) {
	          c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++;
	        }
	      }
	    }, get: function get(a) {
	      if (a instanceof Y) return a;for (var b = this.recognizers, c = 0; c < b.length; c++) {
	        if (b[c].options.event == a) return b[c];
	      }return null;
	    }, add: function add(a) {
	      if (f(a, "add", this)) return this;var b = this.get(a.options.event);return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
	    }, remove: function remove(a) {
	      if (f(a, "remove", this)) return this;if (a = this.get(a)) {
	        var b = this.recognizers,
	            c = r(b, a);-1 !== c && (b.splice(c, 1), this.touchAction.update());
	      }return this;
	    }, on: function on(a, b) {
	      if (a !== d && b !== d) {
	        var c = this.handlers;return g(q(a), function (a) {
	          c[a] = c[a] || [], c[a].push(b);
	        }), this;
	      }
	    }, off: function off(a, b) {
	      if (a !== d) {
	        var c = this.handlers;return g(q(a), function (a) {
	          b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a];
	        }), this;
	      }
	    }, emit: function emit(a, b) {
	      this.options.domEvents && ka(a, b);var c = this.handlers[a] && this.handlers[a].slice();if (c && c.length) {
	        b.type = a, b.preventDefault = function () {
	          b.srcEvent.preventDefault();
	        };for (var d = 0; d < c.length;) {
	          c[d](b), d++;
	        }
	      }
	    }, destroy: function destroy() {
	      this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
	    } }, la(ha, { INPUT_START: Ea, INPUT_MOVE: Fa, INPUT_END: Ga, INPUT_CANCEL: Ha, STATE_POSSIBLE: nb, STATE_BEGAN: ob, STATE_CHANGED: pb, STATE_ENDED: qb, STATE_RECOGNIZED: rb, STATE_CANCELLED: sb, STATE_FAILED: tb, DIRECTION_NONE: Ia, DIRECTION_LEFT: Ja, DIRECTION_RIGHT: Ka, DIRECTION_UP: La, DIRECTION_DOWN: Ma, DIRECTION_HORIZONTAL: Na, DIRECTION_VERTICAL: Oa, DIRECTION_ALL: Pa, Manager: ia, Input: x, TouchAction: V, TouchInput: P, MouseInput: L, PointerEventInput: M, TouchMouseInput: R, SingleTouchInput: N, Recognizer: Y, AttrRecognizer: aa, Tap: ga, Pan: ba, Swipe: fa, Pinch: ca, Rotate: ea, Press: da, on: m, off: n, each: g, merge: ta, extend: sa, assign: la, inherit: i, bindFn: j, prefixed: u });var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};wb.Hammer = ha,  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return ha;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha;
	}(window, document, "Hammer");
	//# sourceMappingURL=hammer.min.js.map

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (err) {
	  return console.log(err.toString(), err);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sendMessage = __webpack_require__(4);
	var logError = __webpack_require__(2);
	
	var onLocalSessionCreated = function onLocalSessionCreated(desc) {
	  imperio.peerConnection.setLocalDescription(desc, function () {
	    sendMessage(imperio.peerConnection.localDescription);
	  }, logError);
	};
	
	module.exports = onLocalSessionCreated;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	var sendMessage = function sendMessage(message) {
	  console.log('Client sending message: ' + message);
	  imperio.socket.emit('message', message, imperio.room);
	};
	
	module.exports = sendMessage;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	// Sets up a listener for the acceleration event and expects to receive an object
	// with the acceleration data in the form of {x: x, y:y, z:z}.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the acceleration event is triggered.
	var desktopAccelHandler = function desktopAccelHandler(callback) {
	  if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
	    imperio.dataChannel.onmessage = function (event) {
	      var eventObject = JSON.parse(event.data);
	      if (eventObject.type === 'acceleration') {
	        delete eventObject.type;
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var panEmitter = __webpack_require__(12);
	var pinchEmitter = __webpack_require__(13);
	var pressEmitter = __webpack_require__(14);
	var pressUpEmitter = __webpack_require__(15);
	var rotateEmitter = __webpack_require__(16);
	var rotateStartEmitter = __webpack_require__(18);
	var rotateEndEmitter = __webpack_require__(17);
	var swipeEmitter = __webpack_require__(19);
	
	function curse(action, element, callback) {
	  var hammertime = new Hammer(element);
	  if (action === 'pan') panEmitter(element, callback);
	  if (action === 'pinch') pinchEmitter(element, callback);
	  if (action === 'press') pressEmitter(element, callback);
	  if (action === 'pressUp') pressUpEmitter(element, callback);
	  if (action === 'rotate') rotateEmitter(element, callback);
	  if (action === 'rotateEnd') rotateEndEmitter(element, callback);
	  if (action === 'rotateStart') rotateStartEmitter(element, callback);
	  if (action === 'swipe') swipeEmitter(element, callback);
	}
	
	module.exports = curse;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	function buildPanObject(panEventObject) {
	  var panObject = {};
	  panObject.center = panEventObject.center;
	  panObject.deltaX = panEventObject.deltaX;
	  panObject.deltaY = panEventObject.deltaY;
	  panObject.velocityX = panEventObject.velocityX;
	  panObject.velocityY = panEventObject.velocityY;
	  panObject.direction = panEventObject.type;
	  panObject.deltaTime = panEventObject.deltaTime;
	  panObject.start = false;
	  panObject.end = false;
	  return panObject;
	}
	
	var panEmitter = function panEmitter(element, callback) {
	  var hammertime = new Hammer(element);
	  hammertime.on('pan', function (event) {
	    var panData = buildPanObject(event);
	    imperio.socket.emit('pan', imperio.room, panData);
	    if (callback) callback(panData);
	  });
	  hammertime.on('panstart', function (event) {
	    var panData = buildPanObject(event);
	    panData.start = true;
	    imperio.socket.emit('pan', imperio.room, panData);
	    if (callback) callback(panData);
	  });
	  hammertime.on('panend', function (event) {
	    var panData = buildPanObject(event);
	    panData.end = true;
	    imperio.socket.emit('pan', imperio.room, panData);
	    if (callback) callback(panData);
	  });
	};
	
	module.exports = panEmitter;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	function buildPinchObject(panEventObject) {
	  var pinchObject = {};
	  pinchObject.center = panEventObject.center;
	  pinchObject.deltaX = panEventObject.deltaX;
	  pinchObject.deltaY = panEventObject.deltaY;
	  pinchObject.velocityX = panEventObject.velocityX;
	  pinchObject.velocityY = panEventObject.velocityY;
	  pinchObject.direction = panEventObject.additionalEvent;
	  pinchObject.deltaTime = panEventObject.deltaTime;
	  pinchObject.rotation = panEventObject.rotation;
	  pinchObject.angle = panEventObject.angle;
	  pinchObject.start = false;
	  pinchObject.end = false;
	  return pinchObject;
	}
	
	var pinchEmitter = function pinchEmitter(element, callback) {
	  var hammertime = new Hammer(element);
	  hammertime.get('pinch').set({ enable: true });
	  hammertime.on('pinch', function (event) {
	    var pinchData = {};
	    pinchData.type = 'pinch';
	    pinchData.direction = event.additionalEvent;
	    pinchData.scale = event.scale;
	    imperio.socket.emit('pinch', imperio.room, event);
	    if (callback) callback(pinchData);
	  });
	  hammertime.on('pinchstart', function (event) {
	    var pinchData = {};
	    pinchData.type = 'pinch';
	    pinchData.direction = event.additionalEvent;
	    pinchData.scale = event.scale;
	    pinchData.start = true;
	    imperio.socket.emit('pinch', imperio.room, event);
	    if (callback) callback(pinchData);
	  });
	  hammertime.on('pinchend', function (event) {
	    var pinchData = {};
	    pinchData.type = 'pinch';
	    pinchData.direction = event.additionalEvent;
	    pinchData.scale = event.scale;
	    pinchData.end = true;
	    imperio.socket.emit('pinch', imperio.room, event);
	    if (callback) callback(pinchData);
	  });
	};
	
	module.exports = pinchEmitter;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hammerMin = __webpack_require__(1);
	
	var _hammerMin2 = _interopRequireDefault(_hammerMin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pressEmitter = function pressEmitter(element, callback) {
	  var hammertime = new _hammerMin2.default(element);
	  hammertime.on('press', function (event) {
	    imperio.socket.emit('press', imperio.room, event);
	    if (callback) callback(event);
	  });
	};
	
	module.exports = pressEmitter;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hammerMin = __webpack_require__(1);
	
	var _hammerMin2 = _interopRequireDefault(_hammerMin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pressUpEmitter = function pressUpEmitter(element, callback) {
	  var hammertime = new _hammerMin2.default(element);
	  hammertime.on('pressup', function (event) {
	    imperio.socket.emit('pressUp', imperio.room, event);
	    if (callback) callback(event);
	  });
	};
	
	module.exports = pressUpEmitter;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hammerMin = __webpack_require__(1);
	
	var _hammerMin2 = _interopRequireDefault(_hammerMin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rotateEmitter = function rotateEmitter(element, callback) {
	  var hammertime = new _hammerMin2.default(element);
	  hammertime.get('rotate').set({ enable: true });
	  hammertime.on('rotate', function (event) {
	    // const rotateData = {};
	    // rotateData.direction = event.additionalEvent;
	    // rotateData.scale = event.scale;
	    imperio.socket.emit('rotate', imperio.room, event);
	    if (callback) callback(event);
	  });
	};
	
	module.exports = rotateEmitter;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hammerMin = __webpack_require__(1);
	
	var _hammerMin2 = _interopRequireDefault(_hammerMin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rotateEndEmitter = function rotateEndEmitter(element, callback) {
	  var hammertime = new _hammerMin2.default(element);
	  hammertime.get('rotate').set({ enable: true });
	  hammertime.on('rotateend', function (event) {
	    // const rotateData = {};
	    // rotateData.direction = event.additionalEvent;
	    // rotateData.scale = event.scale;
	    imperio.socket.emit('rotateEnd', imperio.room, event);
	    if (callback) callback(event);
	  });
	};
	
	module.exports = rotateEndEmitter;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hammerMin = __webpack_require__(1);
	
	var _hammerMin2 = _interopRequireDefault(_hammerMin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rotateStartEmitter = function rotateStartEmitter(element, callback) {
	  var hammertime = new _hammerMin2.default(element);
	  hammertime.get('rotate').set({ enable: true });
	  hammertime.on('rotatestart', function (event) {
	    // const rotateData = {};
	    // rotateData.direction = event.additionalEvent;
	    // rotateData.scale = event.scale;
	    imperio.socket.emit('rotateStart', imperio.room, event);
	    if (callback) callback(event);
	  });
	};
	
	module.exports = rotateStartEmitter;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hammerMin = __webpack_require__(1);
	
	var _hammerMin2 = _interopRequireDefault(_hammerMin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var swipeEmitter = function swipeEmitter(element, callback) {
	  var hammertime = new _hammerMin2.default(element);
	  hammertime.on('swipe', function (event) {
	    imperio.socket.emit('swipe', imperio.room, event);
	    if (callback) callback(event);
	  });
	};
	
	module.exports = swipeEmitter;

/***/ },
/* 20 */
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
	    if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
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
	    if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
	      imperio.dataChannel.send(JSON.stringify(accObject));
	    } else imperio.socket.emit('acceleration', imperio.room, accObject);
	    if (callback) callback(accObject);
	  };
	};
	
	module.exports = mobileAccelShare;

/***/ },
/* 21 */
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
	    if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
	      imperio.dataChannel.send(JSON.stringify(gyroObject));
	    } else imperio.socket.emit('gyroscope', imperio.room, gyroObject);
	    if (callback) callback(gyroObject);
	  };
	};
	
	module.exports = mobileGyroShare;

/***/ },
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	// Attach to a tappable element and it will emit the tap event.
	// Accepts 1 argument:
	// 1. A callback function that will be run every time the tap event is triggered.
	var mobileTapShare = function mobileTapShare(callback) {
	  if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
	    console.log('webRTC tap event');
	    imperio.dataChannel.send('tap');
	  } else {
	    console.log('socket tap event');
	    imperio.socket.emit('tap', imperio.room);
	  }
	  if (callback) callback();
	};
	
	module.exports = mobileTapShare;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	function requestNonceTimeout(socket, room, callback) {
	  imperio.socket.emit('updateNonceTimeouts', imperio.room);
	  if (callback) callback();
	}
	
	module.exports = requestNonceTimeout;

/***/ },
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sendMessage = __webpack_require__(4);
	var logError = __webpack_require__(2);
	var onDataChannelCreated = __webpack_require__(30);
	var onLocalSessionCreated = __webpack_require__(3);
	
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _cookiesMin = __webpack_require__(27);
	
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
/* 30 */
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
	        // TODO: Add all of the other event listeners
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var logError = __webpack_require__(2);
	var onLocalSessionCreated = __webpack_require__(3);
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createPeerConnection = __webpack_require__(28);
	var signalingMessageCallback = __webpack_require__(31);
	
	var webRTCConnect = function webRTCConnect() {
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
	};
	
	module.exports = webRTCConnect;

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	
	var peerConnectionSupported = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	var getUserMediaSupported = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;
	
	// export whether the browser supports peerconnection and dataConnection
	module.exports = !!peerConnectionSupported && !!getUserMediaSupported;

/***/ },
/* 34 */
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
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	* This emits to the specified room, the location of
	* @param The getCurrentPosition.coords property has several properties eg:
	*        accuracy,altitude, altitudeAccuracy, heading, latitude, longitude
	*        & speed
	*/
	
	var mobileGeoLocationShare = function mobileGeoLocationShare(socket, room, callback) {
	  if (!navigator.geolocation) {
	    console.log('This browser does not support Geolocation');
	    return;
	  }
	  navigator.geolocation.getCurrentPosition(function (position) {
	    var geoLocationObject = {
	      type: 'geoLocation',
	      coordinates: position.coords
	    };
	    if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
	      imperio.dataChannel.send(JSON.stringify(geoLocationObject));
	    } else imperio.socket.emit('geoLocation', imperio.room, geoLocationObject);
	    if (callback) callback(geoLocationObject);
	  });
	};
	
	module.exports = mobileGeoLocationShare;

/***/ }
/******/ ]);
//# sourceMappingURL=imperio.js.map