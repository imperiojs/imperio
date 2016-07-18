// Adds a listener to the window on the mobile device in order to read the accelerometer data.
// Will send accelerometer data to the socket in the form of {x: x, y:y, z:z}.
// Accepts 3 arguments:
// 1. The socket you would like to connect to as the first parameter.
// 2. A room name that will inform the server which room to emit the acceleration event and data to.
// 4. A callback function that will be run every time the tap event is triggered, by default
// we will provide this function with the accelerometer data.
const mobileAccelShare = {};

mobileAccelShare.gravity = (localCallback, modifyDataCallback) => {
  window.ondevicemotion = event => {
    const x = Math.round(event.accelerationIncludingGravity.x);
    const y = Math.round(event.accelerationIncludingGravity.y);
    const z = Math.round(event.accelerationIncludingGravity.z);
    let accObject = {
      type: 'acceleration',
      x,
      y,
      z,
    };
    if (modifyDataCallback) accObject = modifyDataCallback(accObject);
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(accObject));
    } else imperio.socket.emit('acceleration', imperio.room, accObject);
    if (localCallback) localCallback(accObject);
  };
};

mobileAccelShare.noGravity = (localCallback, modifyDataCallback) => {
  window.ondevicemotion = event => {
    const x = Math.round(event.acceleration.x);
    const y = Math.round(event.acceleration.y);
    const z = Math.round(event.acceleration.z);
    let accObject = {
      type: 'acceleration',
      x,
      y,
      z,
    };
    if (modifyDataCallback) accObject = modifyDataCallback(accObject);
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(accObject));
    } else imperio.socket.emit('acceleration', imperio.room, accObject);
    if (localCallback) localCallback(accObject);
  };
};

module.exports = mobileAccelShare;
