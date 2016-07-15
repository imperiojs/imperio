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
  navigator.geolocation.getCurrentPosition(position => {
    const locationObject = {
      type: 'location',
      coordinates: position.coords,
    };
    if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
      imperio.dataChannel.send(JSON.stringify(locationObject));
    } else imperio.socket.emit('geoLocation', imperio.room, locationObject);
    if (callback) callback(locationObject);
  });
};

module.exports = mobileLocationShare;
