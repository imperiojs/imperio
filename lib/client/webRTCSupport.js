let prefix;
let version;

const PC = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;

if (window.mozRTCPeerConnection || navigator.mozGetUserMedia) {
  prefix = 'moz';
  version = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
} else if (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) {
  prefix = 'webkit';
  version = navigator.userAgent.match(/Chrom(e|ium)/) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
}
// export support flags and constructors.prototype && PC
module.exports = {
  prefix,
  browserVersion: version,
  support: !!PC && !!getUserMedia,
  getUserMedia,
};
