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
        // TODO: Add all of the other event listeners
        // TODO: Add callbacks to imperio object
        // TODO: modify all the handlers to remove webRTC and save the callbacks
        // TODO: Modifly all sharing functions to have to callbacks, dataFunction and localFunction
        // TODO: dataFunction will modify the data to be emitted and then that same modified data will be used for the localFunction Callback.
      };
    };
  }
};

module.exports = onDataChannelCreated;
