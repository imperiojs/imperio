// Sets up a listener for a tap event on the desktop.
// Accepts 2 arguments:
// 1. The socket you would like to connect to as the first parameter.
// 2. A callback function that will be run every time the tap event is triggered.
const desktopTapHandler = (socket, callback) => {
  socket.on('tap', () => {
    callback();
  });
};

module.exports = desktopTapHandler;
