// Sets up a listener for the acceleration event and expects to receive an object
// with the acceleration data in the form of {x: x, y:y, z:z}.
// Accepts 2 arguments:
// 1. The socket you would like to connect to.
// 2. A callback function that will be run every time the acceleration event is triggered.
const desktopAccelHandler = callback => {
  if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
    imperio.dataChannel.onmessage = event => {
      const accObject = JSON.parse(event.data).accObject;
      if (accObject) {
        if (callback) callback(accObject);
      }
    };
  } else {
    imperio.socket.on('acceleration', accObject => {
      if (callback) callback(accObject);
    });
  }
};

module.exports = desktopAccelHandler;
