"use strict";
const mobileController = {};

mobileController.handleRequest = function(connectRequests) {
  return function(req, res, next) {
    if (req.useragent && req.useragent.isMobile) {
      console.log(`request is from Mobile`);
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
        console.log('the nonce exists and matches to roomId:', connectRequests[nonce].roomId);
      }
      // if incorrect then redirect to rootmobile page with error message
    }
    next();
  }
}

module.exports = mobileController;
