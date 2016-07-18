const pressUpEmitter = (element, localCallback, modifyDataCallback) => {
  const hammertime = new Hammer(element);
  hammertime.on('pressup', event => {
    if (modifyDataCallback) event = modifyDataCallback(event);    
    event.type = 'pressUp';
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('pressUp', imperio.room, event);
    if (localCallback) localCallback(event);
  });
};

module.exports = pressUpEmitter;
