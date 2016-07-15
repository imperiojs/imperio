const sendMessage = require('./sendMessage.js');
const logError = require('./logError.js');

const onLocalSessionCreated = desc => {
  imperio.peerConnection.setLocalDescription(desc, () => {
    sendMessage(imperio.peerConnection.localDescription);
  }, logError);
};

module.exports = onLocalSessionCreated;
