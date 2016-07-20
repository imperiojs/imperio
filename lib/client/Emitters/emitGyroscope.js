// Adds a listener to the window on the mobile device in order to read the gyroscope data.
// Will send gyroscope data to the socket in the form of {alpha: alpha, beta:beta, gamma:gamma}.
// Accepts 1 argument:
// 1. A callback function that will be run every time the tap event is triggered, by default
// we will provide this function with the gyroscope data.
const mobileGyroShare = (localCallback, modifyDataCallback) => {
  // window.ondeviceorientation = function gyroShare(event) {
  function gyroShare(event) {
    const alpha = Math.round(event.alpha);
    const beta = Math.round(event.beta);
    const gamma = Math.round(event.gamma);
    let gyroObject = {
      alpha,
      beta,
      gamma,
    };
    if (modifyDataCallback) gyroObject = modifyDataCallback(gyroObject);
    const webRTCData = {
      data: gyroObject,
      type: 'gyroscope',
    };
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('gyroscope', imperio.room, gyroObject);
    if (localCallback) localCallback(gyroObject);
  }

  function removeGyroShare() {
    console.log('TOUCHED');
    window.removeEventListener('deviceorientation', gyroShare);
  }

  window.addEventListener('deviceorientation', gyroShare);
  // window.document.body.addEventListener('touchend', removeGyroShare);
};

module.exports = mobileGyroShare;
