// const socket = io();
// import getCookie from './../getCookie.js';
// const room = getCookie('roomId');

const mobileRoomSetup = (socket, room, callback) => {
  socket.on('connect', () => {
    socket.emit('createRoom', room);
    callback();
  });
};

module.exports = mobileRoomSetup;
