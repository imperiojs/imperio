/**
* This emits to the specified room, the location of
* @param The getCurrentPosition.coords property has several properties eg:
*        accuracy,altitude, altitudeAccuracy, heading, latitude, longitude
*        & speed
*/
const mobileLocationShare = (socket, room, callback) => {
  if (!navigator.geolocation) {
    console.log('This browser does not support Geolocation');
    return;
  }
  const locationPosition = navigator.geolocation.getCurrentPosition(position => position);
  socket.emit('geoLocation', room, locationPosition);
  if (callback) callback(locationPosition);
};

module.exports = mobileLocationShare;
