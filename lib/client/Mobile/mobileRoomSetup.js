// Establishes a connection to the socket and shares the room it should connnect to.
// Accepts 1 arguments:
// 1. A callback that is invoked when the connect event is received
// (happens once on first connect to socket).

const mobileRoomSetup = callback => {
  imperio.socket.on('connect', () => {
    // only attempt to join room if room is defined in cookie and passed here
    if (imperio.room) {
      const clientData = {
        room: imperio.room,
        id: imperio.socket.id,
        role: 'emitter',
      };
      imperio.socket.emit('createRoom', clientData);
    }
    if (callback) callback(imperio.socket);
  });
};

module.exports = mobileRoomSetup;
