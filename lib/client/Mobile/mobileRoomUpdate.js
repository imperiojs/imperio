// Sets up a listener for updates to client connections to the room.
// Accepts 1 argument:
// 1. A callback function to handle the roomData object passed with the event
const mobileRoomUpdate = callback => {
  imperio.socket.on('updateRoomData', roomData => {
    if (callback) callback(roomData);
  });
};

module.exports = mobileRoomUpdate;
