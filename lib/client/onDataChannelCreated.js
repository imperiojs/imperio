const onDataChannelCreated = () => {
  if (imperio.dataChannel) {
    imperio.dataChannel.onopen = () => {
      console.log('CHANNEL opened!!!');
      imperio.connectionType = 'webRTC';
      imperio.dataChannel.onmessage = event => {
        const eventObject = JSON.parse(event.data);
        if (eventObject.type === 'acceleration') {
          delete eventObject.type;
          if (imperio.callbacks.acceleration) imperio.callbacks.acceleration(eventObject);
        }
        if (eventObject.type === 'gyroscope') {
          delete eventObject.type;
          if (imperio.callbacks.gyroscope) imperio.callbacks.gyroscope(eventObject);
        }
        if (eventObject.type === 'geoLocation') {
          delete eventObject.type;
          if (imperio.callbacks.geoLocation) imperio.callbacks.geoLocation(eventObject);
        }
        if (eventObject === 'tap') {
          if (imperio.callbacks.tap) imperio.callbacks.tap();
        }
        if (eventObject.type === 'pan') {
          delete eventObject.type;
          if (imperio.callbacks.pan) imperio.callbacks.pan(eventObject);
        }
        if (eventObject.type === 'pinch') {
          delete eventObject.type;
          if (imperio.callbacks.pinch) imperio.callbacks.pinch(eventObject);
        }
        if (eventObject.type === 'press') {
          delete eventObject.type;
          if (imperio.callbacks.press) imperio.callbacks.press(eventObject);
        }
        if (eventObject.type === 'pressUp') {
          delete eventObject.type;
          if (imperio.callbacks.pressUp) imperio.callbacks.pressUp(eventObject);
        }
        if (eventObject.type === 'rotate') {
          delete eventObject.type;
          if (imperio.callbacks.rotate) imperio.callbacks.rotate(eventObject);
        }
        if (eventObject.type === 'swipe') {
          delete eventObject.type;
          if (imperio.callbacks.swipe) imperio.callbacks.swipe(eventObject);
        }

        // TODO: Add callbacks to imperio object
        // TODO: modify all the handlers to remove webRTC and save the callbacks
        // TODO: Modifly all sharing functions to have to callbacks, dataFunction and localFunction
        // TODO: dataFunction will modify the data to be emitted and then that same modified data will be used for the localFunction Callback.
      };
    };
  }
};

module.exports = onDataChannelCreated;
