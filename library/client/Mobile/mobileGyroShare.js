// Adds a listener to the window on the mobile device in order to read the gyroscope data.
// Will send gyroscope data to the socket in the form of {alpha: alpha, beta:beta, gamma:gamma}.
// Accepts 3 arguments:
// 1. The socket you would like to connect to as the first parameter.
// 2. A room name that will inform the server which room to emit the gyroscope event and data to.
// 3. A callback function that will be run every time the tap event is triggered, by default
// we will provide this function with the gyroscope data.
const mobileGyroShare = (socket, room, callback) => {
  window.ondeviceorientation = event => {
    const alpha = Math.round(event.alpha);
    const beta = Math.round(event.beta);
    const gamma = Math.round(event.gamma);
    const gyroObject = {
      alpha,
      beta,
      gamma,
    };
    socket.emit('gyroscope', room, gyroObject);
    callback(gyroObject);
  };
};

module.exports = mobileGyroShare;
