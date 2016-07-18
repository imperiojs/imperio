const rotateEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.get('rotate').set({ enable: true });
  hammertime.on('rotate', event => {
    event.start = false;
    event.end = false;
    // TODO: see if this has rotate already
    event.type = 'rotate';
    imperio.callbacks.rotate = callback;
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('rotate', imperio.room, event);
    if (callback) callback(event);
  });
  hammertime.on('rotatestart', event => {
    event.start = true;
    event.end = false;
    // TODO: see if this has rotate already
    event.type = 'rotateStart';
    imperio.callbacks.rotateStart = callback;
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('rotate', imperio.room, event);
    if (callback) callback(event);
  });
  hammertime.on('rotateend', event => {
    event.start = false;
    event.end = true;
    // TODO: see if this has rotate already
    event.type = 'rotateEnd';
    imperio.callbacks.rotateEnd = callback;
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('rotate', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = rotateEmitter;
