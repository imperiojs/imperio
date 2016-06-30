const socket = io();

const gyroHandle = callback => {
  socket.on('gyroscope', callback);
};

module.exports = gyroHandle;
