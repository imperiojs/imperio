/* eslint-disable no-console, no-param-reassign, no-shadow, no-alert, strict */
'use strict';
/** *************************************************************************
* Initial setup
****************************************************************************/

const configuration = {
  iceServers: [{ url: 'stun:stun.l.google.com:19302' }],
};
const dataChannelReceive = document.querySelector('textarea#dataChannelReceive');
const testButton = document.querySelector('button#test');

// Create a random room if not already present in the URL.
let isInitiator;
let room = window.location.hash.substring(1);
if (!room) {
  room = window.location.hash = randomToken();
}

/** *************************************************************************
* Signaling server
****************************************************************************/

// Connect to the signaling server
const socket = io.connect();

socket.on('created', (room, clientId) => {
  console.log(`Created room, ${room} - my client ID is, ${clientId}`);
  isInitiator = true;
});

socket.on('joined', (room, clientId) => {
  console.log(`This peer has joined room, ${room}, with client ID, ${clientId}`);
  isInitiator = false;
  createPeerConnection(isInitiator, configuration);
});

socket.on('full', room => {
  alert(`Room ${room} is full. We will create a new room for you.`);
  window.location.hash = '';
  window.location.reload();
});

socket.on('ready', () => {
  console.log('Socket is ready');
  createPeerConnection(isInitiator, configuration);
});

socket.on('log', array => {
  console.log.apply(console, array);
});

socket.on('message', message => {
  console.log(`Client received message: ${message}`);
  signalingMessageCallback(message);
});
// Join a room
socket.emit('create or join', room);

/**
* Send message to signaling server
*/
function sendMessage(message) {
  console.log(`Client sending message: ${message}`);
  socket.emit('message', message);
}

/* **************************************************************************
* Helper functions for WebRTC data connection
****************************************************************************/

function randomToken() {
  return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
}

function logError(err) {
  console.log(err.toString(), err);
}

/* **************************************************************************
* WebRTC peer connection and data channel
****************************************************************************/

let peerConn;
let dataChannel;

function createPeerConnection(isInitiator, config) {
  console.log('Creating Peer connection as initiator?', isInitiator, 'config:', config);
  peerConn = new RTCPeerConnection(config);
  // send any ice candidates to the other peer
  peerConn.onicecandidate = event => {
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
    dataChannel = peerConn.createDataChannel('phone data', { ordered: false, maxRetransmits: 0 });
    onDataChannelCreated(dataChannel);
    console.log('Creating an offer');
    peerConn.createOffer(onLocalSessionCreated, logError);
  } else {
    peerConn.ondatachannel = event => {
      console.log('ondatachannel:', event.channel);
      dataChannel = event.channel;
      onDataChannelCreated(dataChannel);
    };
  }
}

function signalingMessageCallback(message) {
  if (message.type === 'offer') {
    console.log('Got offer. Sending answer to peer.');
    peerConn.setRemoteDescription(new RTCSessionDescription(message), () => {}, logError);
    peerConn.createAnswer(onLocalSessionCreated, logError);
  } else if (message.type === 'answer') {
    console.log('Got answer.');
    peerConn.setRemoteDescription(new RTCSessionDescription(message), () => {}, logError);
  } else if (message.type === 'candidate') {
    peerConn.addIceCandidate(new RTCIceCandidate({ candidate: message.candidate }));
  } else if (message === 'bye') {
  // TODO: do something when device disconnects?
  }
}

function onLocalSessionCreated(desc) {
  peerConn.setLocalDescription(desc, () => {
    sendMessage(peerConn.localDescription);
  }, logError);
}

const webRTCDataObject = {};

function onDataChannelCreated(channel) {
  channel.onopen = () => {
    console.log('CHANNEL opened!!!');

    window.ondevicemotion = event => {
      const x = Math.round(event.accelerationIncludingGravity.x);
      const y = Math.round(event.accelerationIncludingGravity.y);
      const z = Math.round(event.accelerationIncludingGravity.z);
      const accObject = {
        x,
        y,
        z,
      };
      webRTCDataObject.accObject = accObject;
      channel.send(JSON.stringify(webRTCDataObject));
      delete webRTCDataObject.accObject;
    };

    window.ondeviceorientation = event => {
      const alpha = Math.round(event.alpha);
      const beta = Math.round(event.beta);
      const gamma = Math.round(event.gamma);
      const gyroObject = {
        alpha,
        beta,
        gamma,
      };
      webRTCDataObject.gyroObject = gyroObject;
      channel.send(JSON.stringify(webRTCDataObject));
      delete webRTCDataObject.gyroObject;
    };

    navigator.geolocation.getCurrentPosition(position => {
      webRTCDataObject.locationObject = position;
      channel.send(JSON.stringify(webRTCDataObject));
      delete webRTCDataObject.locationObject;
    });

    testButton.addEventListener('click', () => {
      webRTCDataObject.tapEvent = true;
      channel.send(JSON.stringify(webRTCDataObject));
      delete webRTCDataObject.tapEvent;
    });
  };

  channel.onmessage = event => {
    console.log(JSON.parse(event.data));
  };
}
