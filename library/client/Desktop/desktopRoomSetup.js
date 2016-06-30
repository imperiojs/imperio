const socket = io();
import getCookie from './../getCookie.js';
const room = getCookie('roomId');

const desktopConnect = callback => {
  socket.on('connect', () => {
    socket.emit('createRoom', room);
    callback();
  });
};

module.exports = desktopConnect;
