const pinchEmitter = (element, localCallback, modifyDataCallback) => {
  const hammertime = new Hammer(element);
  hammertime.get('pinch').set({ enable: true });
  hammertime.on('pinch', event => {
    event.start = false;
    event.end = false;
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'pinch';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('pinch', imperio.room, event);
    if (localCallback) localCallback(event);
  });
  hammertime.on('pinchstart', event => {
    event.start = true;
    event.end = false;
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'pinch';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('pinch', imperio.room, event);
    if (localCallback) localCallback(event);
  });
  hammertime.on('pinchend', event => {
    event.start = false;
    event.end = true;
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'pinch';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('pinch', imperio.room, event);
    if (localCallback) localCallback(event);
  });
};

module.exports = pinchEmitter;
