"use strict"; // eslint-disable-line
function initializeEcho(server) {
  const Echo = {};
  Echo.desktopController = require('./desktopController.js');
  Echo.mobileController = require('./mobileController.js');
  Echo.activeConnectRequests = {};

  Echo.init = function echoInit() {
    const that = this;
    // Include our dependency middleware
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const useragent = require('express-useragent');

    return (req, res, next) => {
      // create an object on the req object that we can store stuff in
      req.echo = {};
      req.echo.connected = false;

      // Run our dependency middleware
      useragent.express()(req, res, () => {});
      bodyParser.urlencoded({ extended: true })(req, res, () => {});
      cookieParser()(req, res, () => {});

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

      next();
    };
  };

  // uh oh
  const io = require('socket.io')(server);
  Echo.socket = io;

  io.on('connection', socket => {
    console.log('A socket has a connection');
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
      console.log('A user has disconnected');
      io.emit('user disconnected');
    });
    socket.on('acceleration', (room, accObject) => {
      console.log(accObject);
      io.sockets.in(room).emit('acceleration', accObject);
    });
    socket.on('gyroscope', (room, gyroObject) => {
      console.log(gyroObject);
      io.sockets.in(room).emit('gyroscope', gyroObject);
    });
  });

  return Echo;
}

module.exports = initializeEcho;
