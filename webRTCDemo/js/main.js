/* eslint-disable no-console, no-param-reassign, no-shadow, no-alert, strict */
'use strict';
/** *************************************************************************
* Initial setup
****************************************************************************/

const configuration = {
  iceServers: [{ url: 'stun:stun.l.google.com:19302' }],
};

const dataChannelSend = document.querySelector('textarea#dataChannelSend');
const dataChannelReceive = document.querySelector('textarea#dataChannelReceive');
const sendButton = document.querySelector('button#sendButton');
sendButton.onclick = sendData;

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

socket.on('ipaddr', ipaddr => {
  console.log(`Server IP address is: ${ipaddr}`);
});

socket.on('created', (room, clientId) => {
  console.log(`Created room, ${room} - my client ID is, ${clientId}`);
  isInitiator = true;
  // open the connection
  // run a function
});

socket.on('joined', (room, clientId) => {
  console.log(`This peer has joined room, ${room}, with client ID, ${clientId}`);
  isInitiator = false;
  createPeerConnection(isInitiator, configuration);
  // run a function after second one joins
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

if (location.hostname.match(/localhost|127\.0\.0/)) {
  socket.emit('ipaddr');
}
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

function trace(text) {
  if (text[text.length - 1] === '\n') text = text.substring(0, text.length - 1);
  if (window.performance) {
    const now = (window.performance.now() / 1000).toFixed(3);
    console.log(`${now}:${text}`);
  } else console.log(text);
}

function sendData() {
  const data = dataChannelSend.value;
  dataChannel.send(data);
  trace(`Sent Data: ${data}`);
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
    dataChannel = peerConn.createDataChannel('phone data');
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
  console.log('local session created:', desc);
  peerConn.setLocalDescription(desc, () => {
    console.log('sending local desc:', peerConn.localDescription);
    sendMessage(peerConn.localDescription);
  }, logError);
}

function onDataChannelCreated(channel) {
  console.log('onDataChannelCreated:', channel);
  channel.onopen = () => {
    console.log('CHANNEL opened!!!');
  };
  channel.onmessage = (adapter.browserDetails.browser === 'firefox') ?
  receiveDataFirefoxFactory() : receiveDataChromeFactory();
}

function receiveDataChromeFactory() {
  let buf, count;

  return function onmessage(event) {
    if (typeof event.data === 'string') {
      buf = window.buf = new Uint8ClampedArray(parseInt(event.data));
      count = 0;
      console.log(event.data);
      dataChannelReceive.innerHTML = event.data;
      // console.log('Expecting a total of ' + buf.byteLength + ' bytes of codes');
      return;
    }

    let data = new Uint8ClampedArray(event.data);
    buf.set(data, count);

    count += data.byteLength;
    console.log('count: ' + count);

    if (count === buf.byteLength) {
      // we're done: all data chunks have been received
      console.log('Done. Rendering photo.');
    }
  };
}
