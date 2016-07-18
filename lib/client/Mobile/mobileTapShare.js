// Attach to a tappable element and it will emit the tap event.
// Accepts 1 argument:
// 1. A callback function that will be run every time the tap event is triggered.
const mobileTapShare = callback => {
  if (imperio.webRTCSupport === true && imperio.dataChannel.readyState === 'open') {
    imperio.dataChannel.send('tap');
  } else {
    imperio.socket.emit('tap', imperio.room);
  }
  if (callback) callback();
};

module.exports = mobileTapShare;
