// Attach to a tappable element and it will emit the tap event.
// Accepts 1 argument:
// 1. A callback function that will be run every time the tap event is triggered.
const mobileTapShare = (callback, data) => {
  if (imperio.connectionType === 'webRTC') {
    const webRTCData = {
      data,
      type: 'tap',
    };
    imperio.dataChannel.send(webRTCData);
  } else imperio.socket.emit('tap', imperio.room, data);
  if (callback) callback(data);
};

module.exports = mobileTapShare;
