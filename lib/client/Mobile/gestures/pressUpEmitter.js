const pressUpEmitter = (element, localCallback, modifyDataCallback) => {
  const hammertime = new Hammer(element);
  hammertime.on('pressup', event => {
    event.start = false;
    event.end = true;
    if (modifyDataCallback) event = modifyDataCallback(event);    
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'pressUp';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('pressUp', imperio.room, event);
    if (localCallback) localCallback(event);
  });
};

module.exports = pressUpEmitter;
