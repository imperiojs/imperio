const panEmitter = require('./gestures/panEmitter.js');
const pinchEmitter = require('./gestures/pinchEmitter.js');
const pinchStartEmitter = require('./gestures/pinchStartEmitter.js');
const pinchEndEmitter = require('./gestures/pinchEndEmitter.js');
const pressEmitter = require('./gestures/pressEmitter.js');
const rotateEmitter = require('./gestures/rotateEmitter.js');
const swipeEmitter = require('./gestures/swipeEmitter.js');
const tapEmitter = require('./gestures/tapEmitter.js');

function curse(action, element, callback) {
  const hammertime = new Hammer(element);
  // if (action === 'pan') panEmitter(element, callback);
  if (action === 'pinch') pinchEmitter(element, callback);
  if (action === 'pinchstart') pinchStartEmitter(element, callback);
  if (action === 'pinchend') pinchEndEmitter(element, callback);
  // if (action === 'press') pressEmitter(element, callback);
  // if (action === 'rotate') rotateEmitter(element, callback);
  if (action === 'swipe') swipeEmitter(element, callback);
  if (action === 'tap') tapEmitter(element, callback);
}

module.exports = curse;
