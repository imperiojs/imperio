const emitPinch = (element, localCallback, modifyDataCallback) => {
  const imperioControl = new Hammer(element);
  const pinchEvents = ['pinch', 'pinchstart', 'pinchend'];
  imperioControl.get('pinch').set({ enable: true });
  pinchEvents.forEach(pinchEvent => {
    imperioControl.on(pinchEvent, event => {
      event.start = pinchEvent.indexOf('start') > -1;
      event.end = pinchEvent.indexOf('end') > -1;
      if (modifyDataCallback) event = modifyDataCallback(event);
      if (imperio.connectionType === 'webRTC') {
        const webRTCData = {};
        webRTCData.data = event;
        webRTCData.type = 'pinch';
        imperio.dataChannel.send(JSON.stringify(webRTCData));
      } else imperio.socket.emit('pinch', imperio.room, event);
      if (localCallback) localCallback(event);
    });
  });
};

module.exports = emitPinch;
