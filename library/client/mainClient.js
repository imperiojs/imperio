'use strict';
const frontEndEcho = {};
// import Cookies from './../../client/lib/cookies-js/dist/cookies.js';
// frontEndEcho.Cookies = Cookies;
// require('./../../client/lib/cookies-js/dist/cookies.js');
frontEndEcho.mobileTapShare = require('./Mobile/mobileTapShare.js');
frontEndEcho.mobileAccelShare = require('./Mobile/mobileAccelShare.js');
frontEndEcho.mobileGyroShare = require('./Mobile/mobileGyroShare.js');
frontEndEcho.mobileRoomSetup = require('./Mobile/mobileRoomSetup.js');
frontEndEcho.desktopTapHandler = require('./Desktop/desktopTapHandler.js');
frontEndEcho.desktopAccelHandler = require('./Desktop/desktopAccelHandler.js');
frontEndEcho.desktopGyroHandler = require('./Desktop/desktopGyroHandler.js');
frontEndEcho.desktopRoomSetup = require('./Desktop/desktopRoomSetup.js');

if (typeof module === 'undefined') module.exports = frontEndEcho;
else window.frontEndEcho = frontEndEcho;
