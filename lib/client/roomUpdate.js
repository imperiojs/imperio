// Sets up a listener for updates to client connections to the room.
// Accepts 1 argument:
// 1. A callback function to handle the roomData object passed with the event
const roomUpdate = callback => {
  imperio.socket.on('updateRoomData', roomData => {
    imperio.myID = imperio.socket.id;
    imperio.otherIDs = Object.keys(roomData.sockets)
      .map(socketID => socketID.substring(2))
      .filter(socketID => socketID !== imperio.myID);
    if (callback) callback(roomData);
  });
};

module.exports = roomUpdate;
