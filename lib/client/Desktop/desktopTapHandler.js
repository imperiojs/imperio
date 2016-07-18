/**
 * Sets up a listener for a tap event on the desktop.
 * @param {Object} socket - The socket you would like to connect to
 * @param {function} callback - A callback function
 *        that will be run every time the tap event is triggered
 */
const desktopTapHandler = (socket, callback) => {
  socket.on('tap', data => {
    if (callback) callback(data);
  });
};

module.exports = desktopTapHandler;
