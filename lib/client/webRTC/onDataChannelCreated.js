const onDataChannelCreated = () => {
  if (imperio.dataChannel) {
    imperio.dataChannel.onopen = () => {
      console.log('CHANNEL opened!!!');
      imperio.connectionType = 'webRTC';
      imperio.dataChannel.onmessage = event => {
        const eventObject = JSON.parse(event.data);
        const handlerOptions = ['acceleration', 'gyroscope', 'geoLocation', 'tap',
              'pan', 'pinch', 'press', 'presUp', 'rotate', 'swipe', 'data'];
        handlerOptions.forEach(handler => {
          if (eventObject.type === handler) {
            if (imperio.callbacks[handler]) imperio.callbacks[handler](eventObject.data);
          }
        });
      };
    };
  }
};

module.exports = onDataChannelCreated;
