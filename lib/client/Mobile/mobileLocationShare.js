/**
* This emits to the specified room, the location of
* @param The getCurrentPosition.coords property has several properties eg:
*        accuracy,altitude, altitudeAccuracy, heading, latitude, longitude
*        & speed
*/
const mobileLocationShare = callback => {
  if (!navigator.geolocation) {
    console.log('This browser does not support Geolocation');
    return;
  }
  const locationObject = navigator.geolocation.getCurrentPosition(position => position);
  if (imperio.webRTCSupport === true) {
    imperio.webRTCDataObject.locationObject = locationObject;
    imperio.dataChannel.send(JSON.stringify(imperio.webRTCDataObject));
  } else imperio.socket.emit('geoLocation', imperio.room, locationObject);
  if (callback) callback(locationObject);
};

module.exports = mobileLocationShare;
