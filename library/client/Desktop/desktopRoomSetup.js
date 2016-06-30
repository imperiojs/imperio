const socket = io();
import getCookie from './../getCookie.js';
const room = getCookie('roomId');

const desktopConnect = (callback) => {
  socket.on('connect', () => {
    // h6Element.innerHTML = `Socket connection, in ${room}`;
    socket.emit('createRoom', room);
  });
};

module.exports = desktopConnect;
