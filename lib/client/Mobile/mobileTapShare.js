// Attach to a tappable element and it will emit the tap event.
// Accepts 1 argument:
// 1. A callback function that will be run every time the tap event is triggered.
const mobileTapShare = callback => {
  imperio.socket.emit('tap', imperio.room);
  if (callback) callback();
};

module.exports = mobileTapShare;
