const socket = io();
import getCookie from './../getCookie.js';
const room = getCookie('roomId');

const mobileRoomSetup = callback => {
  socket.on('connect', () => {
    socket.emit('createRoom', room);
    callback();
  });
};

module.exports = mobileRoomSetup;
