'use strict';
// const socket = io();
const frontEndEcho = {};
// import Cookies from './../../client/lib/cookies-js/dist/cookies.js';
// frontEndEcho.Cookies = Cookies;
// require('./../../client/lib/cookies-js/dist/cookies.js');
frontEndEcho.mobileTapShare = require('./Mobile/mobileTapShare.js');
frontEndEcho.mobileAccelShare = require('./Mobile/mobileAccelShare.js');
frontEndEcho.mobileGyroShare = require('./Mobile/mobileGyroShare.js');
frontEndEcho.mobileRoomSetup = require('./Mobile/mobileRoomSetup.js');
frontEndEcho.DesktopTapHandler = require('./Desktop/desktopTapHandler.js');
frontEndEcho.DesktopAccelHandler = require('./Desktop/desktopTapHandler.js');
frontEndEcho.DesktopGyroHandler = require('./Desktop/desktopTapHandler.js');
frontEndEcho.DesktopRoomSetup = require('./Desktop/desktopTapHandler.js');


if (typeof module === 'undefined') module.exports = frontEndEcho;
else window.frontEndEcho = frontEndEcho;
