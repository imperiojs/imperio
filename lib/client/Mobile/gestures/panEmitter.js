const panEmitter = (element, localCallback, modifyDataCallback) => {
  const hammertime = new Hammer(element);
  hammertime.on('pan', event => {
    event.start = false;
    event.end = false;
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'pan';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('pan', imperio.room, event);
    if (localCallback) localCallback(event);
  });
  hammertime.on('panstart', event => {
    event.start = true;
    event.end = false;
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'pan';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('pan', imperio.room, event);
    if (localCallback) localCallback(event);
  });
  hammertime.on('panend', event => {
    event.start = false;
    event.end = true;
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'pan';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('pan', imperio.room, event);
    if (localCallback) localCallback(event);
  });
};

module.exports = panEmitter;
