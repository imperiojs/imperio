// Sets up a listener for the acceleration event and expects to receive an object
// with the acceleration data in the form of {x: x, y:y, z:z}.
// Accepts 2 arguments:
// 1. The socket you would like to connect to.
// 2. A callback function that will be run every time the tap event is triggered.
const desktopAccelHandler = (socket, callback) => {
  socket.on('acceleration', accelObj => {
    callback(accelObj);
  });
};

module.exports = desktopAccelHandler;
