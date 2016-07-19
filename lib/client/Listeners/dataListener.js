/**
 * Sets up a listener for a data event.
 * @param {Object} socket - The socket you would like to connect to
 * @param {function} callback - A callback function
 *        that will be run every time the tap event is triggered
 */
const dataListener = callback => {
  imperio.callbacks.data = callback;
  imperio.socket.on('data', data => {
    if (callback) callback(data);
  });
};

module.exports = dataListener;
