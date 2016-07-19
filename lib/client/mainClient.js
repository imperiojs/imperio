'use strict'; // eslint-disable-line
// initialize library storage object
const imperio = {};
const Hammer = require('./hammer.min.js');
// import our getCookie function which we will use to pull
// out the roomID and nonce cookie for socket connection and display on client
const getCookie = require('./getCookie.js');
// import io from 'socket.io';
require('webrtc-adapter');
const io = require('socket.io-client');
// instantiate our shared socket
imperio.socket = io(); // eslint-disable-line
// store roomID to pass to server for room creation and correctly routing the emissions
imperio.room = getCookie('roomId');
// store nonce to use to display and show emit user how to connect
imperio.nonce = getCookie('nonce');
imperio.myID = null;
imperio.otherIDs = null;
// check if webRTC is supported by client imperio.webRTCSupport will be true or false
imperio.webRTCSupport = require('./webRTC/webRTCSupport.js');
// ICE server config, will remove
// TODO: set this to ENV variables
imperio.webRTCConfiguration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
// determines if current connection is socket or rtc
imperio.connectionType = null;
// initiate webRTC connection
imperio.webRTCConnect = require('./webRTC/webRTCConnect.js');
// will store the dataChannel where webRTC data will be passed
imperio.dataChannel = null;
// peerConnection stored on imperio
imperio.peerConnection = null;
// storage place for pointers to callback functions passed into handler functions
imperio.callbacks = {};
// take a tap event and emit the tap event
imperio.emitTap = require('./Emitters/gestures/emitTap.js');
// sets up listener for motion data and emits object containing x,y,z coords
imperio.emitAcceleration = require('./Emitters/emitAcceleration.js');
// sets up a listener for location data and emits object containing coordinates and time
imperio.emitGeoLocation = require('./Emitters/emitGeoLocation.js');
// sets up a listener for orientation data and emits object containing alpha, beta, and gamma data
imperio.emitGyroscope = require('./Emitters/emitGyroscope.js');
// establishes connection to socket and shares room it should connnect to
imperio.emitRoomSetup = require('./Emitters/emitRoomSetup.js');
// emit any data you want
imperio.emitData = require('./Emitters/emitData.js');
// emits socket event to request nonce timeout data
imperio.requestNonceTimeout = require('./Emitters/requestNonceTimeout.js');
// sets up listener for tap event on listener
imperio.tapListener = require('./Listeners/tapListener.js');
// sets up listener for accel event/data on listener
imperio.geoLocationListener = require('./Listeners/geoLocationListener.js');
// sets up listener for location event/data on listener
imperio.accelerationListener = require('./Listeners/accelerationListener.js');
// sets up listener for gyro event/data on listener
imperio.gyroscopeListener = require('./Listeners/gyroscopeListener.js');
// establishes connection to socket and shares room it should connnect to
imperio.listenerRoomSetup = require('./Listeners/listenerRoomSetup.js');
// listen for data event
imperio.dataListener = require('./Listeners/dataListener.js')

imperio.gesture = require('./Emitters/gesture.js');
const events = ['pan', 'pinch', 'press', 'pressUp', 'rotate', 'swipe'];
events.forEach(event => {
  const eventHandler = `${event}Listener`;
  imperio[eventHandler] = callback => {
    imperio.callbacks[event] = callback;
    imperio.socket.on(event, eventObject => {
      if (callback) callback(eventObject);
    });
  };
});
// sets up listener for changes to client connections to the room
imperio.roomUpdate = require('./roomUpdate.js');
// sends updates on nonce timeouts to the browser
imperio.nonceTimeoutUpdate = require('./Listeners/nonceTimeoutUpdate.js');
// attaches our library object to the window so it is accessible when we use the script tag
window.imperio = imperio;
