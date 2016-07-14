/* global imperio */

const sendMessage = message => {
  console.log(`Client sending message: ${message}`);
  imperio.socket.emit('message', message);
};

module.exports = sendMessage;
