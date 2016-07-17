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

      };
    };
  }
};

module.exports = onDataChannelCreated;
