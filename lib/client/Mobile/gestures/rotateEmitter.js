const rotateEmitter = (element, localCallback, modifyDataCallback) => {
  const imperioControl = new Hammer(element);
  const rotateEvents = ['rotate', 'rotatestart', 'rotateend'];  
  imperioControl.get('rotate').set({ enable: true });
  rotateEvents.forEach(rotateEvent => {
    imperioControl.on(rotateEvent, event => {
      event.start = rotateEvent.indexOf('start') > -1;
      event.end = rotateEvent.indexOf('end') > -1;
      if (modifyDataCallback) event = modifyDataCallback(event);
      if (imperio.connectionType === 'webRTC') {
        const webRTCData = {};
        webRTCData.data = event;
        webRTCData.type = 'rotate';
        imperio.dataChannel.send(JSON.stringify(webRTCData));
      } else imperio.socket.emit('rotate', imperio.room, event);
      if (localCallback) localCallback(event);
    });
  });
};

module.exports = rotateEmitter;
