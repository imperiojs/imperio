const gyroHandle = (socket, callback) => {
  socket.on('gyroscope', gyroObj => {
    console.log(`inside desktop gyro handler`);
    callback(gyroObj);
  });
};

module.exports = gyroHandle;
