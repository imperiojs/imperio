// Attach to a tappable element and it will emit the tap event.
// Accepts 1 argument:
// 1. A callback function that will be run every time the tap event is triggered.
const emitTap = (element, localCallback, modifyDataCallback) => {
  element.addEventListener('click', event => {
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {
        data: event,
        type: 'tap',
      };
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('tap', imperio.room, event);
    if (localCallback) localCallback(event);
  });
};

module.exports = emitTap;
