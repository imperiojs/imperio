"use strict"; // eslint-disable-line
/* eslint-disable no-console, global-require, no-param-reassign */
function initializeEcho(server) {
  const Echo = {};
  Echo.desktopController = require('./desktopController.js');
  Echo.mobileController = require('./mobileController.js');
  Echo.activeConnectRequests = {};

  Echo.init = function echoInit() {
    console.log('init called');
    const that = this;
    // Include our dependency middleware
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const useragent = require('express-useragent');

    function echoMiddleware(req, res, next) {
      if (req.method === 'GET') {
        // If this is a get request (for now, at '/'), run these
        // Only execute this func if we're accessing it from a desktop
        that.desktopController.handleRequest(req, res, that.activeConnectRequests);
        // Only execute this func if we're accessing it from a mobile device
        that.mobileController.handleRequest(req, res, that.activeConnectRequests);
      } else if (req.method === 'POST') {
        // Else if this is a post request (for now, at '/'), run these
        that.mobileController.handlePost(req, res, that.activeConnectRequests);
      }

      // Execute the next middleware function in the express middleware chain
      next();
    }

    return (req, res, next) => {
      // console.log('middleware called');
      // Create an object on the req object that we can store stuff in
      req.echo = {};
      req.echo.connected = false;

      // Bind our middleware dependencies, then finally our middleware function
      const bpArgs = { extended: true };
      const em = echoMiddleware.bind(null, req, res, next);
      const cp = cookieParser().bind(null, req, res, em);
      const bp = bodyParser.urlencoded(bpArgs).bind(null, req, res, cp);
      const ua = useragent.express().bind(null, req, res, bp);

      // Execute the bound chain of middleware
      ua();
    };
  };

  // uh oh
  const io = require('socket.io')(server);
  Echo.socket = io;

  io.on('connection', socket => {
    // console.log('A socket has a connection');
    socket.on('createRoom', room => {
      console.log(`Joined ${room}`);
      // decrypt token?
      socket.join(room);
    });
    socket.on('tap', room => {
      console.log('Tap from mobile!');
      io.sockets.in(room).emit('tap');
    });
    socket.on('disconnect', () => {
      // console.log('A user has disconnected');
      io.emit('user disconnected');
    });
    socket.on('acceleration', (room, accObject) => {
      // console.log(`accel evet received`);
      io.sockets.in(room).emit('acceleration', accObject);
    });
    socket.on('gyroscope', (room, gyroObject) => {
      // console.log(`gyro evet received`);
      io.sockets.in(room).emit('gyroscope', gyroObject);
    });
  });

  return Echo;
}

module.exports = initializeEcho;
