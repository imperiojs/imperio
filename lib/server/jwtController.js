"use strict"; // eslint-disable-line
const jwt = require('jsonwebtoken');
const uuid = require('node-uuid');
const keys = require('./../../keys.js');
const jwtController = {};

/**
 * Creates and jwt token and attaches it to the response in a cookie
 * @param {String} roomId - unique id of socket room
 * @param {Object} res - response object
 */
jwtController.createTokenFrom = (roomId, res) => {
  const token = jwt.sign({ roomId }, keys.secret);
  res.cookie('session', token, { httpOnly: true });
};

/**
 * Decodes jwt token string and returns the roomId string stored on it
 * @param  {String} token - jwt token from client
 * @return {String} roomId - unique id of socket room
 */
jwtController.getRoomIdFrom = token => {
  const decoded = jwt.verify(token, keys.secret);
  const roomId = decoded.roomId;
  return roomId;
};

/**
 * If a token exists, extracts the existing room's id from the token
 * Otherwise creates a room with a unique room id and stores it in a token
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {String} roomId - unique id of socket room
 */
jwtController.handleSession = (req, res) => {
  const token = req.cookies.session;
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
