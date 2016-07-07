/**
 * Sets up a listener for a tap event on the desktop.
 * @param {Object} socket - The socket you would like to connect to
 * @param {funciton} callback - A callback function
 *        that will be run every time the tap event is triggered
 */
const desktopTapHandler = (socket, callback) => {
  socket.on('tap', () => {
    if (callback) callback();
  });
};

module.exports = desktopTapHandler;
