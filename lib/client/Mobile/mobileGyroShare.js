// Adds a listener to the window on the mobile device in order to read the gyroscope data.
// Will send gyroscope data to the socket in the form of {alpha: alpha, beta:beta, gamma:gamma}.
// Accepts 1 argument:
// 1. A callback function that will be run every time the tap event is triggered, by default
// we will provide this function with the gyroscope data.
const mobileGyroShare = callback => {
  window.ondeviceorientation = event => {
    const alpha = Math.round(event.alpha);
    const beta = Math.round(event.beta);
    const gamma = Math.round(event.gamma);
    const gyroObject = {
      alpha,
      beta,
      gamma,
    };
    if (imperio.webRTCSupport === true) {
      imperio.webRTCDataObject.gyroObject = gyroObject;
      imperio.dataChannel.send(JSON.stringify(imperio.webRTCDataObject));
    } else imperio.socket.emit('gyroscope', imperio.room, gyroObject);
    if (callback) callback(gyroObject);
  };
};

module.exports = mobileGyroShare;
