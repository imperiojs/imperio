const mobileLocationShare = (socket,room,callback) => {

    if (!navigator.geolocation){
      console.log('This browser does not support Geolocation');
    }
    /**
     *
     * @param The getCurrentPosition.coords property has several properties eg:
     *        accuracy,altitude, altitudeAccuracy, heading, latitude, longitude
     *        & speed
     * @param Tell the developer in readme that whatever is being returned in the callback
     *         has to be an object
     */
    const locationPosition = navigator.geolocation.getCurrentPosition((position) => {
       return position;
    });

    var locationProperties = {
      locationProperties,
    }

    var sendLocationData = ()=>{
      if (callback){
        return callback(locationPosition);
      }else{
        return locationProperties;
      }
    }

    frontEndEcho.socket.emit('geoLocation', frontEndEcho.room, sendLocationData())
}

mobile.exports = mobileLocationShare;
