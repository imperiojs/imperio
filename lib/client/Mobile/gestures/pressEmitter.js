const pressEmitter = (element, localCallback, modifyDataCallback) => {
  const hammertime = new Hammer(element);
  hammertime.on('press', event => {
    if (modifyDataCallback) event = modifyDataCallback(event);
    event.type = 'press';
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('press', imperio.room, event);
    if (localCallback) localCallback(event);
  });
};

module.exports = pressEmitter;
