// Establishes a connection to the socket and shares the room it should connnect to.
// Accepts 3 arguments:
// 1. The socket you would like to connect to.
// 2. A room name that will inform the server which room to create/join.
// 3. A callback that is invoked when the connect event is received
const nonceTimeoutUpdate = (socket, callback) => {
  socket.on('updateNonceTimeouts', nonceTimeouts => {
    if (callback) callback(nonceTimeouts);
  });
};

module.exports = nonceTimeoutUpdate;
