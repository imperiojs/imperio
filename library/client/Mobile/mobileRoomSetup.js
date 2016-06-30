const socket = io();
import getCookie from './../getCookie.js';
const room = getCookie('roomId');

socket.on('connect', function() {
  //h1Element.innerHTML = `inside socket connect, room is ${room}`;
  socket.emit('createRoom', room);
});
