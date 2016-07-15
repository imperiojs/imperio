/**
 * Sets up a listener for a tap event on the desktop.
 * @param {Object} socket - The socket you would like to connect to
 * @param {function} callback - A callback function
 *        that will be run every time the tap event is triggered
 */
const desktopTapHandler = (socket, callback) => {
  if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
    console.log('inside WebRTC part of tap handler');
    imperio.dataChannel.onmessage = event => {
      if (event.data === 'tap') {
        if (callback) callback();
      }
    };
  } else {
    console.log('inside socket part of tap handler');
    socket.on('tap', () => {
      if (callback) callback();
    });
  }
};

module.exports = desktopTapHandler;
