const socket = io();

const emitTap = () => {
  socket.emit('tap');
};
