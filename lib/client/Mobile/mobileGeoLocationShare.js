/**
* This emits to the specified room, the location of
* @param The getCurrentPosition.coords property has several properties eg:
*        accuracy,altitude, altitudeAccuracy, heading, latitude, longitude
*        & speed
*/

const mobileGeoLocationShare = (socket, room, callback) => {
  if (!navigator.geolocation) {
    console.log('This browser does not support Geolocation');
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    const geoLocationObject = {
      type: 'geoLocation',
      coordinates: position.coords,
    };
    if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
      imperio.dataChannel.send(JSON.stringify(geoLocationObject));
    } else imperio.socket.emit('geoLocation', imperio.room, geoLocationObject);
    if (callback) callback(geoLocationObject);
  });
};

module.exports = mobileGeoLocationShare;
