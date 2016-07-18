const pinchEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.get('pinch').set({ enable: true });
  hammertime.on('pinch', event => {
    event.start = false;
    event.end = false;
    event.type = 'pinch';
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('pinch', imperio.room, event);
    if (callback) callback(event);
  });
  hammertime.on('pinchstart', event => {
    event.start = true;
    event.end = false;
    event.type = 'pinch';
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('pinch', imperio.room, event);
    if (callback) callback(event);
  });
  hammertime.on('pinchend', event => {
    event.start = false;
    event.end = true;
    event.type = 'pinch';
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('pinch', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = pinchEmitter;
