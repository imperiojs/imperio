// Adds a listener to the window on the mobile device in order to read the accelerometer data.
// Will send accelerometer data to the socket in the form of {x: x, y:y, z:z}.
// Accepts 3 arguments:
// 1. The socket you would like to connect to as the first parameter.
// 2. A room name that will inform the server which room to emit the acceleration event and data to.
// 4. A callback function that will be run every time the tap event is triggered, by default
// we will provide this function with the accelerometer data.
const mobileAccelShare = {};

mobileAccelShare.gravity = (socket, room, callback) => {
  window.ondevicemotion = event => {
    const x = Math.round(event.accelerationIncludingGravity.x);
    const y = Math.round(event.accelerationIncludingGravity.y);
    const z = Math.round(event.accelerationIncludingGravity.z);
    const accObject = {
      x,
      y,
      z,
    };
    if (imperio.webRTCSupport.support === true) {
      imperio.webRTCDataObject.accObject = accObject;
      imperio.channel.send(JSON.stringify(imperio.webRTCDataObject));
    } else socket.emit('acceleration', room, accObject);
    if (callback) callback(accObject);
  };
};

mobileAccelShare.noGravity = (socket, room, callback) => {
  window.ondevicemotion = event => {
    const x = Math.round(event.acceleration.x);
    const y = Math.round(event.acceleration.y);
    const z = Math.round(event.acceleration.z);
    const accObject = {
      x,
      y,
      z,
    };
    if (imperio.webRTCSupport.support === true) {
      imperio.webRTCDataObject.accObject = accObject;
      imperio.channel.send(JSON.stringify(imperio.webRTCDataObject));
    } else socket.emit('acceleration', room, accObject);
    if (callback) callback(accObject);
  };
};

module.exports = mobileAccelShare;
