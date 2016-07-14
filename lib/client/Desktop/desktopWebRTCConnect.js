
const desktopWebRTCConnect = () => {
  let isInitiator;
  socket.on('created', (room, clientId) => {
    console.log(`Created room, ${room} - my client ID is, ${clientId}`);
    isInitiator = true;
  });
  socket.on('ready', () => {
    console.log('Socket is ready');
    createPeerConnection(isInitiator, imperio.webRTCConfiguration);
  });
};

// roomData = {length: num, sockets: {[socketID]: emitter/receiver}}

module.exports = desktopWebRTCConnect;
