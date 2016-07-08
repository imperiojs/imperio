"use strict"; // eslint-disable-line
/* eslint-disable no-param-reassign */
const jwtController = require('./jwtController.js');
const nonceController = require('./nonceController.js');

const desktopController = {};

/**
 * Generates or joins a socket room on page load
 * Stores a cookie on the response object identifying the socket room id
 * Generates a nonce (password string) used to pair a device with this device
 * Stores a connection between the nonce and the room until a device uses it
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} connectRequests - a reference to the activeConnectRequests object
 */
desktopController.handleRequest = (req, res, connectRequests) => {
  // Only execute this func if we're accessing it from a desktop
  if (req.useragent && req.useragent.isDesktop) {
    // console.log(`request is from Desktop`);
    // check if already in session, or create session
    const roomId = jwtController.handleSession(req, res);
    res.cookie('roomId', roomId); // DEBUG this is for reference?
    // handle nonce
    const nonce = nonceController.generateNonce(5);
    res.cookie('nonce', nonce);
    connectRequests[nonce] = nonceController.generateConnectRequest(roomId);
  }
};

module.exports = desktopController;
