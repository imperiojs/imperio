"use strict"; // eslint-disable-line
const nonceController = {};

/**
 * Generates a random string of lowercase letters or numbers, of length 'length'
 * @param  {Number} length - desired length of string to be generated
 * @return {String} nonce - randomly generated nonce string
 */
nonceController.generateNonce = length => {
  const possibleChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const possibleCharsLength = possibleChars.length;
  let nonce = '';
  for (let i = 0; i < length; i++) {
    nonce += possibleChars.charAt(
      Math.floor(Math.random() * possibleCharsLength)
    );
  }
  return nonce;
};

/**
 * Creates an object holding roomId and time created. Open connections should
 *   eventually time out based on this timestamp
 * @param  {String} roomId - stores the id for the socket room
 * @return {Object} connectRequest - holds roomId and creation timestamp
 */
nonceController.generateConnectRequest = roomId => ({
  roomId,
  createdAt: Date.now(),
});

/**
 * Checks nonce string against property keys of connect request object
 * @param  {Object} connectRequest - holds roomId and creation timestamp
 * @param  {String} nonce - previously created nonce value to check for
 * @return {Boolean} valid - returns true if valid nonce
 */
nonceController.connectRequestIsValid = (connectRequests, nonce) => {
  const lowerCaseNonce = nonce.toLowerCase();
  return connectRequests.hasOwnProperty(lowerCaseNonce);
};

/**
 * Sets a timeout on connect requests. Nonce <-> Room connections are destroyed
 * when their timeout has expired.
 * @param {Object} connectRequests - reference to the activeConnectRequests obj
 * @param {Number} timeout - time until nonce should timeout in milliseconds
 */
nonceController.handleNonceTimeout = (io, socket, room, connectRequests, timeout) => {
  const timeouts = [];
  for (let nonce in connectRequests) { // eslint-disable-line
    if (connectRequests.hasOwnProperty(nonce)) {
      const roomShort = connectRequests[nonce].roomId.substr(0, 4);
      const elapsed = Date.now() - connectRequests[nonce].createdAt;
      const remaining = new Date(timeout - elapsed);
      if (remaining < 0) {
        delete connectRequests[nonce]; // eslint-disable-line
      } else {
        timeouts.push(`${nonce} -> ${roomShort}... timeout in: ${remaining.getSeconds()} s`);
      }
    }
  }
  io.sockets.in(room).emit('updateNonceTimeouts', timeouts);
};


module.exports = nonceController;
