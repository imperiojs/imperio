const sendMessage = require('./sendMessage.js');
const logError = require('./logError.js');
const onDataChannelCreated = require('./onDataChannelCreated.js');
const onLocalSessionCreated = require('./onLocalSessionCreated.js');

// const createPeerConnection
module.exports = (isInitiator, config) => {
  console.log('Creating Peer connection as initiator?', isInitiator, 'config:', config);
  imperio.peerConnection = new RTCPeerConnection(config);
  // send any ice candidates to the other peer
  imperio.peerConnection.onicecandidate = event => {
    console.log('icecandidate event:', event);
    if (event.candidate) {
      sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate,
      });
    } else {
      console.log('End of candidates.');
    }
  };
  if (isInitiator) {
    console.log('Creating Data Channel');
    imperio.dataChannel = imperio.peerConnection
      .createDataChannel('phone data', { ordered: false, maxRetransmits: 0 });
    onDataChannelCreated();
    console.log('Creating an offer');
    imperio.peerConnection.createOffer(onLocalSessionCreated, logError);
  } else {
    imperio.peerConnection.ondatachannel = event => {
      console.log('ondatachannel:', event.channel);
      imperio.dataChannel = event.channel;
      onDataChannelCreated();
    };
  }
};

// module.export = createPeerConnection;
