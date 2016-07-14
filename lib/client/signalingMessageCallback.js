const signalingMessageCallback = message => {
  if (message.type === 'offer') {
    console.log('Got offer. Sending answer to peer.');
    imperio.peerConn.setRemoteDescription(new RTCSessionDescription(message), () => {}, logError);
    imperio.peerConn.createAnswer(onLocalSessionCreated, logError);
  } else if (message.type === 'answer') {
    console.log('Got answer.');
    imperio.peerConn.setRemoteDescription(new RTCSessionDescription(message), () => {}, logError);
  } else if (message.type === 'candidate') {
    imperio.peerConn.addIceCandidate(new RTCIceCandidate({ candidate: message.candidate }));
  } else if (message === 'bye') {
  // TODO: do something when device disconnects?
  }
};

module.exports = signalingMessageCallback;
