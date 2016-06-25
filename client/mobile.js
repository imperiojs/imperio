var request = require('browser');
const socket = io();
// function to emit tap event
function emitTap(){
  console.log("Tap Event Emitted");
  socket.emit('tap');
}
