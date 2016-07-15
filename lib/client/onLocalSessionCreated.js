const sendMessage = require('./sendMessage.js');
const logError = require('./logError.js');

const onLocalSessionCreated = desc => {
  imperio.peerConn.setLocalDescription(desc, () => {
    sendMessage(imperio.peerConn.localDescription);
  }, logError);
};

module.exports = onLocalSessionCreated;
