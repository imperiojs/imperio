// Sets up a listener for the orientation data and expects to receive an object
// with the gyroscope data in the form of {alpha: alpha, beta:beta, gamma:gamma}.
// Accepts 1 argument:
// 1. A callback function that will be run every time the gyroscope event is triggered.
const gyroscopeListener = callback => {
  imperio.callbacks.gyroscope = callback;
  imperio.socket.on('gyroscope', gyroObject => {
    if (callback) callback(gyroObject);
  });
};

module.exports = gyroscopeListener;
