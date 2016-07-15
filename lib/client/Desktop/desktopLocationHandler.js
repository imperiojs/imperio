// Sets up a listener for the location data and expects to receive an object
// with the location data in the form of {cords: {accuracy:21, altitude:null,
// altitudeAccuracy:null, heading:null, latitude:33.9794281, longitude:-118.42238250000001,
// speed:null}, }.
// Accepts 1 argument:
// 1. A callback function that will be run every time the location event is triggered.
const desktopLocationHandler = callback => {
  if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
    imperio.dataChannel.onmessage = event => {
      const eventObject = JSON.parse(event.data);
      if (eventObject.type === 'location') {
        if (callback) callback(eventObject);
      }
    };
  } else {
    imperio.socket.on('geoLocation', locationObj => {
      if (callback) callback(locationObj);
    });
  }
};

module.exports = desktopLocationHandler;
