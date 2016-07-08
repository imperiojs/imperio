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
 *   eventually time out based on ythis timestamp
 * @param  {String} length - desired length of string to be generated
 * @return {Object} connectRequest - holdes roomId and creation timestamp
 */
nonceController.generateConnectRequest = roomId => ({
  roomId,
  createdAt: Date.now(),
});

/**
 * Checks nonce string against property keys of connect request object
 * @param  {String} length - desired length of string to be generated
 * @return {Boolean} valid - returns true if valid nonce
 */
nonceController.connectRequestIsValid = (connectRequests, nonce) => {
  const lowerCaseNonce = nonce.toLowerCase();
  return connectRequests.hasOwnProperty(lowerCaseNonce);
};

module.exports = nonceController;
