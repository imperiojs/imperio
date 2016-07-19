/**
* This emits to the specified room, the location of
* @param The getCurrentPosition.coords property has several properties eg:
*        accuracy,altitude, altitudeAccuracy, heading, latitude, longitude
*        & speed
*/

const emitGeoLocation = (localCallback, modifyDataCallback) => {
  if (!navigator.geolocation) {
    console.log('This browser does not support Geolocation');
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    let geoLocation = position;
    if (modifyDataCallback) geoLocation = modifyDataCallback(geoLocation);
    const webRTCData = {
      data: geoLocation,
      type: 'geoLocation',
    };
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('geoLocation', imperio.room, geoLocation);
    if (localCallback) localCallback(geoLocation);
  });
};

module.exports = emitGeoLocation;
