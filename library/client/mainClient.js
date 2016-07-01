'use strict';
import getCookie from './getCookie.js';
const frontEndEcho = {};
frontEndEcho.socket = io();
frontEndEcho.room = getCookie('roomId');
frontEndEcho.nonce = getCookie('nonce');
frontEndEcho.mobileTapShare = require('./Mobile/mobileTapShare.js');
frontEndEcho.mobileAccelShare = require('./Mobile/mobileAccelShare.js');
frontEndEcho.mobileGyroShare = require('./Mobile/mobileGyroShare.js');
frontEndEcho.mobileRoomSetup = require('./Mobile/mobileRoomSetup.js');
frontEndEcho.desktopTapHandler = require('./Desktop/desktopTapHandler.js');
frontEndEcho.desktopAccelHandler = require('./Desktop/desktopAccelHandler.js');
frontEndEcho.desktopGyroHandler = require('./Desktop/desktopGyroHandler.js');
frontEndEcho.desktopRoomSetup = require('./Desktop/desktopRoomSetup.js');

window.frontEndEcho = frontEndEcho;

// if (typeof module === 'undefined') module.exports = frontEndEcho;
// else window.frontEndEcho = frontEndEcho;
