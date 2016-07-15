// Sets up a listener for the orientation data and expects to receive an object
// with the gyroscope data in the form of {alpha: alpha, beta:beta, gamma:gamma}.
// Accepts 1 argument:
// 1. A callback function that will be run every time the gyroscope event is triggered.
const desktopGyroHandler = callback => {
  if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
    imperio.dataChannel.onmessage = event => {
      const gyroObject = JSON.parse(event.data).gyroObject;
      if (gyroObject) {
        if (callback) callback(gyroObject);
      }
    };
  } else {
    imperio.socket.on('gyroscope', gyroObject => {
      if (callback) callback(gyroObject);
    });
  }
};

module.exports = desktopGyroHandler;
