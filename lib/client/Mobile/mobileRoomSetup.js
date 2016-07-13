// Establishes a connection to the socket and shares the room it should connnect to.
// Accepts 1 arguments:
// 1. A callback that is invoked when the connect event is received
// (happens once on first connect to socket).
const mobileRoomSetup = callback => {
  imperio.socket.on('connect', () => {
    imperio.socket.emit('createRoom', imperio.room);
    if (callback) callback();
  });
};

module.exports = mobileRoomSetup;
