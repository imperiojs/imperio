const socket = io();
import getCookie from './../getCookie.js';
const room = getCookie('roomId');

function emitTap() {
  socket.emit('tap', room);
}

module.exports = emitTap;
