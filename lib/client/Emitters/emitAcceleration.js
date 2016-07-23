// Adds a listener to the window on the mobile device in order to read the accelerometer data.
// Will send accelerometer data to the socket in the form of {x: x, y:y, z:z}.
// Accepts 3 arguments:
// 1. The socket you would like to connect to as the first parameter.
// 2. A room name that will inform the server which room to emit the acceleration event and data to.
// 4. A callback function that will be run every time the tap event is triggered, by default
// we will provide this function with the accelerometer data.
const emitAcceleration = {};

const handleDeviceMotionGravity = event => {
  const localCallback = imperio.callbacks.gravityLocal;
  const modifyDataCallback = imperio.callbacks.gravityModify;
  const x = event.accelerationIncludingGravity.x;
  const y = event.accelerationIncludingGravity.y;
  const z = event.accelerationIncludingGravity.z;
  let accObject = {
    x,
    y,
    z,
  };
  if (modifyDataCallback) accObject = modifyDataCallback(accObject);
  const webRTCData = {
    data: accObject,
    type: 'acceleration',
  };
  if (imperio.connectionType === 'webRTC') {
    imperio.dataChannel.send(JSON.stringify(webRTCData));
  } else imperio.socket.emit('acceleration', imperio.room, accObject);
  if (localCallback) localCallback(accObject);
};

emitAcceleration.gravity = (localCallback, modifyDataCallback) => {
  imperio.callbacks.gravityLocal = localCallback;
  imperio.callbacks.gravityModify = modifyDataCallback;
  window.addEventListener('devicemotion', handleDeviceMotionGravity);
};
emitAcceleration.removeGravity = () => {
  delete imperio.callbacks.gravityLocal;
  delete imperio.callbacks.gravityModify;
  window.removeEventListener('devicemotion', handleDeviceMotionGravity);
};

const handleDeviceMotionNoGravity = event => {
  const localCallback = imperio.callbacks.noGravityLocal;
  const modifyDataCallback = imperio.callbacks.noGravityModify;
  const x = event.acceleration.x;
  const y = event.acceleration.y;
  const z = event.acceleration.z;
  let accObject = {
    x,
    y,
    z,
  };
  if (modifyDataCallback) accObject = modifyDataCallback(accObject);
  const webRTCData = {
    data: accObject,
    type: 'acceleration',
  };
  if (imperio.connectionType === 'webRTC') {
    imperio.dataChannel.send(JSON.stringify(webRTCData));
  } else imperio.socket.emit('acceleration', imperio.room, accObject);
  if (localCallback) localCallback(accObject);
};

emitAcceleration.noGravity = (localCallback, modifyDataCallback) => {
  imperio.callbacks.noGravityLocal = localCallback;
  imperio.callbacks.noGravityModify = modifyDataCallback;
  window.addEventListener('devicemotion', handleDeviceMotionNoGravity);
};
emitAcceleration.removeNoGravity = () => {
  delete imperio.callbacks.noGravityLocal;
  delete imperio.callbacks.noGravityModify;
  window.removeEventListener('devicemotion', handleDeviceMotionNoGravity);
};

module.exports = emitAcceleration;
