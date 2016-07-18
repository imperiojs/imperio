const swipeEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.on('swipe', event => {
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('swipe', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = swipeEmitter;
