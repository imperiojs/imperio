// TODO add callback to function
const desktopConnect = (socket, room) => {
  socket.on('connect', () => {
    console.log(`inside browser connect room is ${room}`);
    socket.emit('createRoom', room);
    // callback(room);
  });
};

module.exports = desktopConnect;
