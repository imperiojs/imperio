// Establishes a connection to the socket and shares the room it should connnect to.
// Accepts 1 argument:
// 1. A callback that is invoked when the connect event is received
// (happens once on first connect to socket).
const listenerRoomSetup = callback => {
  imperio.socket.on('connect', () => {
    // only attempt to join room if room is defined in cookie and passed here
    imperio.connectionType = 'sockets';
    if (imperio.room) {
      const clientData = {
        room: imperio.room,
        id: imperio.socket.id,
        role: 'listener',
      };
      console.log('about to fire createRoom socket emit');
      imperio.socket.emit('createRoom', clientData);
    }
    if (callback) callback();
  });
};

module.exports = listenerRoomSetup;
