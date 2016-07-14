// Establishes a connection to the socket and shares the room it should connnect to.
// Accepts 3 arguments:
// 1. The socket you would like to connect to.
// 2. A room name that will inform the server which room to create/join.
// 3. A callback that is invoked when the connect event is received
// (happens once on first connect to socket).
// TODO Is this true? the callback is invoked after the msg is emitted, but
//   there's no guarantee that the server got it...
const desktopRoomSetup = (socket, room, callback) => {
  socket.on('connect', () => {
    // only attempt to join room if room is defined in cookie and passed here
    if (room) {
      const clientData = {
        room,
        id: socket.id,
        role: 'receiver',
      };
      socket.emit('createRoom', clientData);
    }
    if (callback) callback();
  });
};

module.exports = desktopRoomSetup;
