const panEmitter = require('./gestures/panEmitter.js');
const pinchEmitter = require('./gestures/pinchEmitter.js');
const pressEmitter = require('./gestures/pressEmitter.js');
const pressUpEmitter = require('./gestures/pressUpEmitter.js');
const rotateEmitter = require('./gestures/rotateEmitter.js');
const swipeEmitter = require('./gestures/swipeEmitter.js');

function curse(action, element, localCallback, modifyDataCallback) {
  if (action === 'pan') panEmitter(element, localCallback, modifyDataCallback);
  if (action === 'pinch') pinchEmitter(element, localCallback, modifyDataCallback);
  if (action === 'press') pressEmitter(element, localCallback, modifyDataCallback);
  if (action === 'pressUp') pressUpEmitter(element, localCallback, modifyDataCallback);
  if (action === 'rotate') rotateEmitter(element, localCallback, modifyDataCallback);
  if (action === 'swipe') swipeEmitter(element, localCallback, modifyDataCallback);
}

module.exports = curse;
