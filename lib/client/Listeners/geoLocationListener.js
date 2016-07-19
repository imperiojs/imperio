// Sets up a listener for the location data and expects to receive an object
// with the location data in the form of {cords: {accuracy:21, altitude:null,
// altitudeAccuracy:null, heading:null, latitude:33.9794281, longitude:-118.42238250000001,
// speed:null}, }.
// Accepts 1 argument:
// 1. A callback function that will be run every time the location event is triggered.
const geoLocationListener = callback => {
  imperio.callbacks.geoLocation = callback;
  imperio.socket.on('geoLocation', locationObj => {
    if (callback) callback(locationObj);
  });
};

module.exports = geoLocationListener;
