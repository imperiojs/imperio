const peerConnectionSupported = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
const getUserMediaSupported = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;

// export whether the browser supports peerconnection and dataConnection
module.exports = !!peerConnectionSupported && !!getUserMediaSupported;
