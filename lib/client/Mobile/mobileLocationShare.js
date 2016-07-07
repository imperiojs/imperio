const mobileLocationShare = (socket, room, callback) => {
  /**
   * @param The getCurrentPosition.coords property has several properties eg:
   *        accuracy,altitude, altitudeAccuracy, heading, latitude, longitude
   *        & speed
   */ m
   if (!navigator.geolocation) {
     console.log('This browser does not support Geolocation');
   }
  const locationPosition = navigator.geolocation.getCurrentPosition(position => position);
  socket.emit('geoLocation', room, locationPosition);
  if (callback) return callback(locationPosition);
};

module.exports = mobileLocationShare;
