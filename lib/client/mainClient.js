'use strict'; // eslint-disable-line
// import our getCookie function which we will use to pull
// out the roomID and nonce cookie for socket connection and display on client
import getCookie from './getCookie.js';
import Hammer from './hammer.min.js';
// import io from 'socket.io';
// initialize library storage object
const imperio = {};
// instantiate our shared socket
imperio.socket = io(); // eslint-disable-line // HACK - is dependency on CDN OK?
// store roomID to pass to server for room creation and correctly routing the emissions
imperio.room = getCookie('roomId');
// store nonce to use to display and show mobile user how to connect
imperio.nonce = getCookie('nonce');
// take a tap event and emit the tap event
imperio.mobileTapShare = require('./Mobile/mobileTapShare.js');
// sets up listener for motion data and emits object containing x,y,z coords
imperio.mobileAccelShare = require('./Mobile/mobileAccelShare.js');
// sets up a listener for location data and emits object containing coordinates and time
imperio.mobileLocationShare = require('./Mobile/mobileLocationShare.js');
// sets up a listener for orientation data and emits object containing alpha, beta, and gamma data
imperio.mobileGyroShare = require('./Mobile/mobileGyroShare.js');
imperio.mobileGyroTimer = require('./Mobile/mobileGyroTimer.js');
// establishes connection to socket and shares room it should connnect to
imperio.mobileRoomSetup = require('./Mobile/mobileRoomSetup.js');
// sets up listener for tap event on desktop
imperio.desktopTapHandler = require('./Desktop/desktopTapHandler.js');
// sets up listener for accel event/data on desktop
imperio.desktopLocationHandler = require('./Desktop/desktopLocationHandler.js');
// sets up listener for location event/data on desktop
imperio.desktopAccelHandler = require('./Desktop/desktopAccelHandler.js');
// sets up listener for gyro event/data on desktop
imperio.desktopGyroHandler = require('./Desktop/desktopGyroHandler.js');
imperio.desktopGyroTimer = require('./Desktop/desktopGyroTimer.js');
// establishes connection to socket and shares room it should connnect to
imperio.desktopRoomSetup = require('./Desktop/desktopRoomSetup.js');
imperio.curse = (action, element, callback) => {
  const hammertime = new Hammer(element);
  if (action === 'swipe') {
    hammertime.on('swipe', (event, callback) => {
      imperio.socket.emit('swipe', imperio.room, event);
      if (callback) callback(event);
    });
  }
  if (action === 'pinch') {
    hammertime.get('pinch').set({ enable: true });    
    hammertime.on('pinch', (event, callback) => {
      let pinchInfo = {};
      pinchInfo.direction = event.additionalEvent;
      pinchInfo.scale = event.scale;
      pinchInfo.isFirst = event.isFirst;
      pinchInfo.isFinal = event.isFinal;
      imperio.socket.emit('pinch', imperio.room, pinchInfo);
      if (callback) callback(pinchInfo);
    });
  }
  if (action === 'pinchstart') {
    hammertime.get('pinch').set({ enable: true });    
    hammertime.on('pinchstart', (event, callback) => {
      // let pinchInfo = {};
      // pinchInfo.direction = event.additionalEvent;
      // pinchInfo.scale = event.scale;
      imperio.socket.emit('pinchstart', imperio.room, event);
      if (callback) callback(event);
    });
  }
  if (action === 'pinchend') {
    hammertime.get('pinch').set({ enable: true });    
    hammertime.on('pinchend', (event, callback) => {
      // let pinchInfo = {};
      // pinchInfo.direction = event.additionalEvent;
      // pinchInfo.scale = event.scale;
      imperio.socket.emit('pinchend', imperio.room, event);
      if (callback) callback(event);
    });
  }
};

imperio.desktopSwipeHandler = callback => {
  imperio.socket.on('swipe', event => {
    if (callback) callback(event);
  });
};

imperio.desktopPinchHandler = callback => {
  imperio.socket.on('pinch', event => {
    if (callback) callback(event);
  });
};
imperio.desktopPinchStartHandler = callback => {
  imperio.socket.on('pinchstart', event => {
    if (callback) callback(event);
  });
};
imperio.desktopPinchEndHandler = callback => {
  imperio.socket.on('pinchend', event => {
    if (callback) callback(event);
  });
};

// attaches our library object to the window so it is accessible when we use the script tag
window.imperio = imperio;
