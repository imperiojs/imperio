const socket = io();

const accelHandle = callback => {
  socket.on('acceleration', callback);
};

module.exports = accelHandle;
