'use strict';
// import our getCookie function which we will use to pull
// out the roomID and nonce cookie for socket connection and display on client
import getCookie from './getCookie.js';
// initialize library storage object
const frontEndEcho = {};
// instantiate our shared socket
frontEndEcho.socket = io();
// store roomID to pass to server for room creation and correctly routing the emissions
frontEndEcho.room = getCookie('roomId');
// store nonce to use to display and show mobile user how to connect
frontEndEcho.nonce = getCookie('nonce');
// take a tap event and emit the tap event
frontEndEcho.mobileTapShare = require('./Mobile/mobileTapShare.js');
// sets up listener for motion data and emits object containing x,y,z coords
frontEndEcho.mobileAccelShare = require('./Mobile/mobileAccelShare.js');
// sets up a listener for orientation data and emits object containing alpha, beta, and gamma data
frontEndEcho.mobileGyroShare = require('./Mobile/mobileGyroShare.js');
// establishes connection to socket and shares room it should connnect to
frontEndEcho.mobileRoomSetup = require('./Mobile/mobileRoomSetup.js');
// sets up listener for tap event on desktop
frontEndEcho.desktopTapHandler = require('./Desktop/desktopTapHandler.js');
// sets up listener for accel event/data on desktop
frontEndEcho.desktopAccelHandler = require('./Desktop/desktopAccelHandler.js');
// sets up listener for gyro event/data on desktop
frontEndEcho.desktopGyroHandler = require('./Desktop/desktopGyroHandler.js');
// establishes connection to socket and shares room it should connnect to
frontEndEcho.desktopRoomSetup = require('./Desktop/desktopRoomSetup.js');
// attaches our library object to the window so it is accessible when we use the script tag
window.frontEndEcho = frontEndEcho;

// if (typeof module === 'undefined') module.exports = frontEndEcho;
// else window.frontEndEcho = frontEndEcho;
