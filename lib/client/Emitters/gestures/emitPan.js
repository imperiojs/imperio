const emitPan = (element, localCallback, modifyDataCallback) => {
  const imperioControl = new Hammer(element);
  const panEvents = ['pan', 'panstart', 'panend'];
  panEvents.forEach(panEvent => {
    imperioControl.on(panEvent, event => {
      event.start = panEvent.indexOf('start') > -1;
      event.end = panEvent.indexOf('end') > -1;
      if (modifyDataCallback) event = modifyDataCallback(event);
      if (imperio.connectionType === 'webRTC') {
        const webRTCData = {};
        webRTCData.data = event;
        webRTCData.type = 'pan';
        imperio.dataChannel.send(JSON.stringify(webRTCData));
      } else imperio.socket.emit('pan', imperio.room, event);
      if (localCallback) localCallback(event);
    });
  });
};

module.exports = emitPan;
