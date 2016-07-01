// Attach to a tappable element and it will emit the tap event.
// Accepts 3 arguments:
// 1. The socket you would like to connect to as the first parameter.
// 2. Accepts a room name that will inform the server which room to emit the tap event to.
// 3. A callback function that will be run every time the tap event is triggered.
// TODO: remove hard coded socket and room.
function mobileTapShare(socket, room, callback) {
  frontEndEcho.socket.emit('tap', frontEndEcho.room);
  callback();
}

module.exports = mobileTapShare;
