const createPeerConnection = (isInitiator, config) => {
  console.log('Creating Peer connection as initiator?', isInitiator, 'config:', config);
  imperio.peerConn = new RTCPeerConnection(config);
  // send any ice candidates to the other peer
  imperio.peerConn.onicecandidate = event => {
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
    imperio.dataChannel = imperio.peerConn.createDataChannel('phone data', { ordered: false, maxRetransmits: 0 });
    onDataChannelCreated(imperio.dataChannel);
    console.log('Creating an offer');
    imperio.peerConn.createOffer(onLocalSessionCreated, logError);
  } else {
    imperio.peerConn.ondatachannel = event => {
      console.log('ondatachannel:', event.channel);
      imperio.dataChannel = event.channel;
      onDataChannelCreated(imperio.dataChannel);
    };
  }
};
