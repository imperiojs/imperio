// Sets up a listener for the acceleration event and expects to receive an object
// with the acceleration data in the form of {x: x, y:y, z:z}.
// Accepts 1 argument:
// 1. A callback function that will be run every time the acceleration event is triggered.
const desktopAccelHandler = callback => {
  if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
    imperio.dataChannel.onmessage = event => {
      const eventObject = JSON.parse(event.data);
      if (eventObject.type === 'acceleration') {
        delete eventObject.type;
        if (callback) callback(eventObject);
      }
    };
  } else {
    imperio.socket.on('acceleration', accObject => {
      if (callback) callback(accObject);
    });
  }
};

module.exports = desktopAccelHandler;
