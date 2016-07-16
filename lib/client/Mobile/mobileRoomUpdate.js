// Sets up a listener for updates to client connections to the room.
// Accepts 2 arguments:
// 1. The connection socket
// 2. A callback function to handle the roomData object passed with the event
const mobileRoomUpdate = (socket, callback) => {
  socket.on('updateRoomData', roomData => {
    if (callback) callback(roomData);
  });
};

module.exports = mobileRoomUpdate;
