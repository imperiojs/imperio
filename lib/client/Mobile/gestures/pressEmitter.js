const pressEmitter = (element, localCallback, modifyDataCallback) => {
  const imperioControl = new Hammer(element);
  imperioControl.on('press', event => {
    event.start = true;
    event.end = false;
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'press';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('press', imperio.room, event);
    if (localCallback) localCallback(event);
  });
};

module.exports = pressEmitter;
