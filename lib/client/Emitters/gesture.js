const emitPan = require('./gestures/emitPan.js');
const emitPinch = require('./gestures/emitPinch.js');
const emitPress = require('./gestures/emitPress.js');
const emitPressUp = require('./gestures/emitPressUp.js');
const emitRotate = require('./gestures/emitRotate.js');
const emitSwipe = require('./gestures/emitSwipe.js');
const emitTap = require('./gestures/emitTap.js');

function curse(action, element, localCallback, modifyDataCallback) {
  if (action === 'pan') emitPan(element, localCallback, modifyDataCallback);
  if (action === 'pinch') emitPinch(element, localCallback, modifyDataCallback);
  if (action === 'press') emitPress(element, localCallback, modifyDataCallback);
  if (action === 'pressUp') emitPressUp(element, localCallback, modifyDataCallback);
  if (action === 'rotate') emitRotate(element, localCallback, modifyDataCallback);
  if (action === 'swipe') emitSwipe(element, localCallback, modifyDataCallback);
  if (action === 'tap') emitTap(element, localCallback, modifyDataCallback);
}

module.exports = curse;
