'use strict'; // eslint-disable-line
// import our getCookie function which we will use to pull
// out the roomID and nonce cookie for socket connection and display on client
const getCookie = require('./getCookie.js');
// import io from 'socket.io';
// initialize library storage object
const imperio = {};
require('webrtc-adapter');
const io = require('socket.io-client');
// instantiate our shared socket
imperio.socket = io(); // eslint-disable-line
// store roomID to pass to server for room creation and correctly routing the emissions
imperio.room = getCookie('roomId');
// store nonce to use to display and show mobile user how to connect
imperio.nonce = getCookie('nonce');
// check if webRTC is supported by client imperio.webRTCSupport will be true or false
imperio.webRTCSupport = require('./webRTCSupport.js');
// ICE server config, will remove
// TODO: set this to ENV variables
imperio.webRTCConfiguration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
// determines if current connection is socket or rtc
imperio.connectionType = null;
// initiate webRTC connection
imperio.webRTCConnect = require('./webRTCConnect.js');
// will store the dataChannel where webRTC data will be passed
imperio.dataChannel = null;
// peerConnection stored on imperio
imperio.peerConnection = null;
// storage place for pointers to callback functions passed into handler functions
imperio.callbacks = {};
// take a tap event and emit the tap event
imperio.mobileTapShare = require('./Mobile/mobileTapShare.js');
// sets up listener for motion data and emits object containing x,y,z coords
imperio.mobileAccelShare = require('./Mobile/mobileAccelShare.js');
// sets up a listener for location data and emits object containing coordinates and time
imperio.mobileGeoLocationShare = require('./Mobile/mobileGeoLocationShare.js');
// sets up a listener for orientation data and emits object containing alpha, beta, and gamma data
imperio.mobileGyroShare = require('./Mobile/mobileGyroShare.js');
// modified gyro share to detect time of emission
imperio.mobileGyroTimer = require('./Mobile/mobileGyroTimer.js');
// establishes connection to socket and shares room it should connnect to
imperio.mobileRoomSetup = require('./Mobile/mobileRoomSetup.js');
// sets up listener for changes to client connections to the room
imperio.mobileRoomUpdate = require('./Mobile/mobileRoomUpdate.js');
// emits socket event to request nonce timeout data
imperio.requestNonceTimeout = require('./Mobile/requestNonceTimeout.js');
// sets up listener for tap event on desktop
imperio.desktopTapHandler = require('./Desktop/desktopTapHandler.js');
// sets up listener for accel event/data on desktop
imperio.desktopGeoLocationHandler = require('./Desktop/desktopGeoLocationHandler.js');
// sets up listener for location event/data on desktop
imperio.desktopAccelHandler = require('./Desktop/desktopAccelHandler.js');
// sets up listener for gyro event/data on desktop
imperio.desktopGyroHandler = require('./Desktop/desktopGyroHandler.js');
// establishes connection to socket and shares room it should connnect to
imperio.desktopRoomSetup = require('./Desktop/desktopRoomSetup.js');

imperio.curse = require('./Mobile/curse.js');

const events = ['pan', 'pinch', 'press', 'pressUp', 'rotate',
               'rotateStart', 'rotateEnd', 'swipe'];
events.forEach(event => {
  const eventHandler = `desktop${event[0].toUpperCase() + event.substring(1)}Handler`;
  imperio[eventHandler] = callback => {
    imperio.callbacks[event] = callback;
    imperio.socket.on(event, eventObject => {
      if (callback) callback(eventObject);
    });
  };
});
// sets up listener for changes to client connections to the room
imperio.desktopRoomUpdate = require('./Desktop/desktopRoomUpdate.js');
// sends updates on nonce timeouts to the browser
imperio.nonceTimeoutUpdate = require('./Desktop/nonceTimeoutUpdate.js');
// attaches our library object to the window so it is accessible when we use the script tag
window.imperio = imperio;
