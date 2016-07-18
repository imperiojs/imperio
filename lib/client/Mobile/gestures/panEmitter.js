const panEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.on('pan', event => {
    event.start = false;
    event.end = false;
    event.type = 'pan';
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('pan', imperio.room, event);
    if (callback) callback(event);
  });
  hammertime.on('panstart', event => {
    event.start = true;
    event.end = false;
    event.type = 'pan';
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('pan', imperio.room, event);
    if (callback) callback(event);
  });
  hammertime.on('panend', event => {
    event.start = false;
    event.end = true;
    event.type = 'pan';
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('pan', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = panEmitter;
