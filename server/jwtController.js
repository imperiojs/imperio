"use strict";
const jwt = require('jsonwebtoken');
const uuid = require('node-uuid');
const secret = 'echoLoJSONisAdumbName';
const jwtController = {};

jwtController.createTokenFrom = (roomId, res) => {
  let token = jwt.sign({ roomId }, secret);
  res.cookie('session', token, { httpOnly: true });
};

jwtController.getRoomIdFrom = token => {
  const decoded = jwt.verify(token, secret);
  let roomId = decoded.roomId;
  return roomId;
};

jwtController.handleSession = (req, res) => {
  let token = req.cookies.session;
  let roomId;
  if (token) {
    roomId = jwtController.getRoomIdFrom(token);
  } else {  // create new session
    // create uuid for session
    roomId = uuid.v1();
    // store that id in the jwt->coooookie
    jwtController.createTokenFrom(roomId, res);
  }

  return roomId;
};

module.exports = jwtController;
