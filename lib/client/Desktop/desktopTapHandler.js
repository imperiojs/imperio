/**
 * Sets up a listener for a tap event on the desktop.
 * @param {Object} socket - The socket you would like to connect to
 * @param {function} callback - A callback function
 *        that will be run every time the tap event is triggered
 */
const desktopTapHandler = (socket, callback) => {
  if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
    imperio.dataChannel.onmessage = event => {
      const tapEvent = JSON.parse(event.data).tapEvent;
      if (tapEvent) {
        if (callback) callback();
      }
    };
  } else {
    socket.on('tap', () => {
      if (callback) callback();
    });
  }
};

module.exports = desktopTapHandler;
