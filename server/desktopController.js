"use strict";
const jwtController = require('./jwtController.js');
const nonceController = require('./nonceController.js');
const path = require('path');

const desktopController = {};

desktopController.handleRequest = function(req, res) {
  console.log(`request if from Desktop`);
  // check if already in session (from cookie)
  const roomId = jwtController.handleSession(req, res);
  res.cookie('roomId', roomId);
  // - if NOT, give it a session via jwt via cookie
  const nonce = nonceController.generateNonce(5);
  res.cookie('nonce', nonce);
  activeConnectRequests[nonce] =
    nonceController.generateConnectRequest(roomId);
  console.log(activeConnectRequests);
  res.sendFile(path.join(`${__dirname}/../client/browser.html`));
  // res.render(`../client/browser.html`);
};

module.exports = desktopController;
