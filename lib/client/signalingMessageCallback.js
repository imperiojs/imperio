const logError = require('./logError.js');
const onLocalSessionCreated = require('./onLocalSessionCreated.js');

const signalingMessageCallback = message => {
  if (message.type === 'offer') {
    console.log('Got offer. Sending answer to peer.');
    imperio.peerConnection
      .setRemoteDescription(new RTCSessionDescription(message), () => {}, logError);
    imperio.peerConnection.createAnswer(onLocalSessionCreated, logError);
  } else if (message.type === 'answer') {
    console.log('Got answer.');
    imperio.peerConnection
      .setRemoteDescription(new RTCSessionDescription(message), () => {}, logError);
  } else if (message.type === 'candidate') {
    console.log('Setting candidate.');
    imperio.peerConnection.addIceCandidate(new RTCIceCandidate({ candidate: message.candidate }));
  } else if (message === 'bye') {
  // TODO: do something when device disconnects?
  }
};

module.exports = signalingMessageCallback;
