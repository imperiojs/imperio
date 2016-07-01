// const socket = io();

const tapHandle = (socket, callback) => {
  socket.on('tap', () => {
    console.log(`inside desktop tap handler`);
    callback();
  });
};

module.exports = tapHandle;
