// Adds a listener to the window on the mobile device in order to read the gyroscope data.
// Will send gyroscope data to the socket in the form of {alpha: alpha, beta:beta, gamma:gamma}.
// Accepts 1 argument:
// 1. A callback function that will be run every time the tap event is triggered, by default
// we will provide this function with the gyroscope data.
const mobileGyroShare = (modifyDataCallback, localCallback) => {
  window.ondeviceorientation = event => {
    const alpha = Math.round(event.alpha);
    const beta = Math.round(event.beta);
    const gamma = Math.round(event.gamma);
    let gyroObject = {
      type: 'gyroscope',
      alpha,
      beta,
      gamma,
    };
    if (modifyDataCallback) gyroObject = modifyDataCallback(gyroObject);
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(gyroObject));
    } else imperio.socket.emit('gyroscope', imperio.room, gyroObject);
    if (localCallback) localCallback(gyroObject);
  };
};

module.exports = mobileGyroShare;
