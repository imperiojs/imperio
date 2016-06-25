"use strict";
const jwt = require('jsonwebtoken');
const uuid = require('node-uuid');
const secret = 'echoLoJSONisAdumbName';
const jwtController = {};

jwtController.handleSession = (req, res) => {
  let token = req.cookies.session;
  let roomId;
  if (token) {
    // do nothing, basically. Maybe refresh token timeout.
    const decoded = jwt.verify(token, secret);
    roomId = decoded.roomId;
  } else {  // create new session
    // create uuid for session
    roomId = uuid.v1();

    // store that id in the jwt->coooookie
    token = jwt.sign({ roomId }, secret);
    res.cookie('session', token, { httpOnly: true });
  }

  return roomId;
};

module.exports = jwtController;
