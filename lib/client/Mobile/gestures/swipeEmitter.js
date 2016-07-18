const swipeEmitter = (element, localCallback, modifyDataCallback) => {
  const imperioControl  = new Hammer(element);
  imperioControl .on('swipe', event => {
    event.start = true;
    event.end = true;
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'swipe';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('swipe', imperio.room, event);
    if (localCallback) localCallback(event);
  });
};

module.exports = swipeEmitter;
