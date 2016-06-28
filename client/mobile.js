// var request = require('browser');
var socket = io();

var h1Element = document.querySelector('h1');
var room = Cookies.get('roomId');
// var room = document.cookie.slice(5);

socket.on('connect', function() {
  h1Element.innerHTML = `inside socket connect, room is ${room}`;
  socket.emit('createRoom', room);
});

// function to emit tap event
function emitTap(){
  console.log("Tap Event Emitted");
  socket.emit('tap', room);
}
