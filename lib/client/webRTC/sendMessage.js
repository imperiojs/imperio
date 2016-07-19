const sendMessage = message => {
  console.log(`Client sending message: ${message}`);
  imperio.socket.emit('message', message, imperio.room);
};

module.exports = sendMessage;
