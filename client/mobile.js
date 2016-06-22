const socket = io();

function emitTap(){
  console.log("Tap Event Emitted");
  socket.emit('tap');
}
