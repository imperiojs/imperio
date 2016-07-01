// const socket = io();
// import getCookie from './../getCookie.js';
// const room = getCookie('roomId');

function emitTap() {
  frontEndEcho.socket.emit('tap', frontEndEcho.room);
}

module.exports = emitTap;
