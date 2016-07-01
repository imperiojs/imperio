// Sets up a listener for the orientation data and expects to receive an object
// with the gyroscope data in the form of {alpha: alpha, beta:beta, gamma:gamma}.
// Accepts 2 arguments:
// 1. The socket you would like to connect to.
// 2. A callback function that will be run every time the tap event is triggered.
const desktopGyroHandler = (socket, callback) => {
  socket.on('gyroscope', gyroObj => {
    callback(gyroObj);
  });
};

module.exports = desktopGyroHandler;
