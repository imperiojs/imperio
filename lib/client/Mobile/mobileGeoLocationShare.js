/**
* This emits to the specified room, the location of
* @param The getCurrentPosition.coords property has several properties eg:
*        accuracy,altitude, altitudeAccuracy, heading, latitude, longitude
*        & speed
*/

const mobileGeoLocationShare = callback => {
  if (!navigator.geolocation) {
    console.log('This browser does not support Geolocation');
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    let geoLocationObject = {
      type: 'geoLocation',
      coordinates: position.coords,
    };
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(geoLocationObject));
    } else imperio.socket.emit('geoLocation', imperio.room, geoLocationObject);
    if (callback) callback(geoLocationObject);
  });
};

module.exports = mobileGeoLocationShare;
