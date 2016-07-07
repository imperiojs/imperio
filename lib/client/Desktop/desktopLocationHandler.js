// Sets up a listener for the location data and expects to receive an object
// with the location data in the form of {cords: {accuracy:21, altitude:null,
// altitudeAccuracy:null, heading:null, latitude:33.9794281, longitude:-118.42238250000001,
// speed:null}, timestamp:time data was pulled}.
// Accepts 2 arguments:
// 1. The socket you would like to connect to.
// 2. A callback function that will be run every time the location event is triggered.
const desktopLocationHandler = (socket, callback) => {
  socket.on('geoLocation', locationObject => {
    if (callback) callback(locationObject);
  });
};

module.exports = desktopLocationHandler;
