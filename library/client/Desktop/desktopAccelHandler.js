// const socket = io();

const accelHandle = (socket, callback) => {
  socket.on('acceleration', accelObj => {
    console.log(`inside desktop accel handler`);
    callback(accelObj);
  });
};

module.exports = accelHandle;
