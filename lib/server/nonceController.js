"use strict"; // eslint-disable-line
const nonceController = {};

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

nonceController.generateConnectRequest = roomId => ({
  roomId,
  createdAt: Date.now(),
});

nonceController.connectRequestIsValid = (connectRequests, nonce) =>
  connectRequests.hasOwnProperty(nonce);

module.exports = nonceController;
