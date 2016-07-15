const createPeerConnection = require('./createPeerConnection.js');
const signalingMessageCallback = require('./signalingMessageCallback.js');

const webRTCConnect = () => {
  imperio.socket.on('created', (room, clientId) => {
    console.log(`Created room, ${room} - my client ID is, ${clientId}`);
    let isInitiator = true;
  });
  imperio.socket.on('joined', (room, clientId) => {
    console.log(`This peer has joined room, ${room}, with client ID, ${clientId}`);
    let isInitiator = false;
    createPeerConnection(isInitiator, imperio.webRTCConfiguration);
  });
  imperio.socket.on('ready', () => {
    console.log('Socket is ready');
    createPeerConnection(true, imperio.webRTCConfiguration);
  });
  imperio.socket.on('log', array => {
    console.log.apply(console, array);
  });
  imperio.socket.on('message', message => {
    console.log(`Client received message: ${message}`);
    signalingMessageCallback(message);
  });
};

module.exports = webRTCConnect;
