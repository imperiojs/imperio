
const desktopGyroTimer = (socket, callback) => {
  socket.on('gyroscopeTimer', (gyroObj, emitDate, serverDate) => {
    if (callback) callback(gyroObj, emitDate, serverDate);
  });
};

module.exports = desktopGyroTimer;