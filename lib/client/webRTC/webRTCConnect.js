const createPeerConnection = require('./createPeerConnection.js');
const signalingMessageCallback = require('./signalingMessageCallback.js');
const webRTCSupport = require('./webRTCSupport.js');

const webRTCConnect = () => {
  if (webRTCSupport) {
    imperio.socket.on('created', (room, clientId) => {
      console.log(`Created room, ${room} - my client ID is, ${clientId}`);
    });
    imperio.socket.on('log', array => {
      console.log.apply(console, array);
    });
    imperio.socket.on('joined', (room, clientId) => {
      console.log(`This peer has joined room, ${room}, with client ID, ${clientId}`);
      createPeerConnection(false, imperio.webRTCConfiguration);
    });
    imperio.socket.on('ready', () => {
      console.log('Socket is ready');
      createPeerConnection(true, imperio.webRTCConfiguration);
    });
    imperio.socket.on('message', message => {
      console.log(`Client received message: ${message}`);
      signalingMessageCallback(message);
    });
  } else console.log('WebRTC is not supported, will continue using Sockets.');
};

module.exports = webRTCConnect;
