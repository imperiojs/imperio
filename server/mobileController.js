"use strict";
const jwtController = require('./jwtController.js');
const mobileController = {};

mobileController.handleRequest = function(connectRequests) {
  return function(req, res, next) {
    if (req.useragent && req.useragent.isMobile) {
      console.log(`request is from Mobile`);
      // check for token / room session
      let token = req.cookies.session;
      let roomId;
      if (token) {
        roomId = jwtController.getRoomIdFrom(token);
        res.cookie('roomId', roomId); //DEBUG this is for reference?
      }
    }
    next();
  }
};

mobileController.handlePost = function(connectRequests) {
  return function(req, res, next) {
    if (req.useragent && req.useragent.isMobile) {
      console.log('post is from Mobile: ', req.body);
      // if correct then redirect to tap page
      let nonce = req.body.codeCheck;
      if (connectRequests.hasOwnProperty(nonce)) {
        let roomId = connectRequests[nonce].roomId;
        console.log('the nonce exists and matches to roomId:', roomId);
        jwtController.createTokenFrom(roomId, res);
        res.cookie('roomId', roomId); //DEBUG this is for reference?
      }
      // if incorrect then redirect to rootmobile page with error message
    }
    next();
  }
}

module.exports = mobileController;
