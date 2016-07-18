const swipeEmitter = (element, localCallback, modifyDataCallback) => {
  const hammertime = new Hammer(element);
  hammertime.on('swipe', event => {
    event.start = true;
    event.end = true;
    if (modifyDataCallback) event = modifyDataCallback(event);
    // event.type = 'swipe';
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('swipe', imperio.room, event);
    if (localCallback) localCallback(event);
  });
};

module.exports = swipeEmitter;
