"use strict"; // eslint-disable-line
/* eslint-disable no-param-reassign */
const jwtController = require('./jwtController.js');
const nonceController = require('./nonceController.js');
const connectionController = {};

/**
 * Generates or joins a socket room when a get request is made to the page
 * Stores a cookie on the response object identifying the socket room id
 * Generates a nonce (password string) used to pair a device with this device
 * Stores a connection between the nonce and the room until a device uses it
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} connectRequests - a reference to the activeConnectRequests object
 */
connectionController.handleGet = (req, res, connectRequests) => {
  // check to see if nonce is passed in as param or as part of query
  let nonce = req.params.nonce || req.query.nonce;
  let roomId;
  if (nonce) {
    // if nonce is provided, check to see if a connection has been made with that nonce
    if (connectRequests.hasOwnProperty(nonce)) {
      roomId = connectRequests[nonce].roomId;
    }
  } else {
    // check if already in session, or create session
    roomId = jwtController.handleSession(req, res);
    // create new nonce
    nonce = nonceController.generateNonce(5);
    connectRequests[nonce] = nonceController.generateConnectRequest(roomId);
  }
  res.cookie('roomId', roomId, { httpOnly: true });
  res.cookie('nonce', nonce, { httpOnly: true });
  req.imperio.connected = true;
};

connectionController.handlePost = (req, res, connectRequests, bodyTag) => {
  const nonce = req.body[bodyTag];
  if (connectRequests.hasOwnProperty(nonce)) {
    // roomId will become the place where we are supposed to ;
    const roomId = connectRequests[nonce].roomId;
    jwtController.createTokenFrom(roomId, res);
    res.cookie('roomId', roomId, { httpOnly: true });
    // TODO: Implement using JWT to establish connection?
    req.imperio.connected = true;
  }
    // if incorrect then redirect to rootclient page with error message
};

module.exports = connectionController;
