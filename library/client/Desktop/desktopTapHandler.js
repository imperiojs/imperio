const socket = io();

const tapHandle = callback => {
  socket.on('tap', callback);
};

module.exports = tapHandle;
