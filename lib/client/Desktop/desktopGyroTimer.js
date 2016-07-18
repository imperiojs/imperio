
const desktopGyroTimer = callback => {
  imperio.socket.on('gyroscopeTimer', (gyroObj, emitDate, serverDate) => {
    if (callback) callback(gyroObj, emitDate, serverDate);
  });
};

module.exports = desktopGyroTimer;
