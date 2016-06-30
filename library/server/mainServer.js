"use strict";
function initializeEcho(server) {
  let Echo = {};
  Echo.test = 'console frog is great';
  Echo.desktopController = require('./desktopController.js');
  Echo.mobileController = require('./mobileController.js');
  Echo.activeConnectRequests = {};
  console.log(`echo is: `, Echo);

  Echo.init = function() {
    let that = this;
    console.log(that);
    return function(req, res, next) {
      // if this is a get request (for now, at '/'), run these
      console.log(`The request method is: ${req.method}`);
      if (req.method === 'GET') {
        // Only execute this func if we're accessing it from a desktop
        that.desktopController.handleRequest(req, res, that.activeConnectRequests);
        // Only execute this func if we're accessing it from a mobile device
        that.mobileController.handleRequest(req, res, that.activeConnectRequests);
      }
      // else if this is a post request (for now, at '/'), run these
      else if (req.method === 'POST') {
        that.mobileController.handlePost(req, res, that.activeConnectRequests);
      }

      next();
    }
  };

  console.log('echo is (after init function): ', Echo);
  // etc etc
  const io = require('socket.io')(server);
  // Echo.socket = io;

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
      // console.log(accObject);
      io.sockets.in(room).emit('acceleration', accObject);
    });
    socket.on('gyroscope', (room, gyroObject) => {
      // console.log(gyroObject);
      io.sockets.in(room).emit('gyroscope', gyroObject);
    });
  });

  return Echo;
}

module.exports = initializeEcho;
