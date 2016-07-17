const panEmitter = require('./gestures/panEmitter.js');
const pinchEmitter = require('./gestures/pinchEmitter.js');
const pressEmitter = require('./gestures/pressEmitter.js');
const pressUpEmitter = require('./gestures/pressUpEmitter.js');
const rotateEmitter = require('./gestures/rotateEmitter.js');
const rotateStartEmitter = require('./gestures/rotateStartEmitter.js');
const rotateEndEmitter = require('./gestures/rotateEndEmitter.js');
const swipeEmitter = require('./gestures/swipeEmitter.js');

function curse(action, element, callback) {
  const hammertime = new Hammer(element);
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
