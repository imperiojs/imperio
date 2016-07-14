const sendMessage = require('')

const onLocalSessionCreated = desc => {
  imperio.peerConn.setLocalDescription(desc, () => {
    sendMessage(imperio.peerConn.localDescription);
  }, logError);
};

module.exports = onLocalSessionCreated;
