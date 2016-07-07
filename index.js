"use strict"; // eslint-disable-line
/* eslint-disable no-console, global-require, no-param-reassign */
function initializeImperio(server) {
  const imperio = {};
  imperio.desktopController = require('./lib/server/desktopController.js');
  imperio.mobileController = require('./lib/server/mobileController.js');
  imperio.activeConnectRequests = {};

  /**
   * Returns a function to be used as express middleware. Dependency middleware
   * is invoked before imperio middleware is invoked. Middleware handles the
   * creation of connection sessions and authenticates connections to these
   * sessions.
   * @return {function} express middleware
   */
  imperio.init = function imperioInit() {
    console.log('init called');
    const that = this;
    // Include our dependency middleware
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const useragent = require('express-useragent');

    /**
     * Handles socket room connection and authentication
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @param {function} next - callback function to continue middleware chain
     */
    function imperioMiddleware(req, res, next) {
      if (req.method === 'GET') {
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

    /**
     * Returned function will invoke dependency middleware and then imperio's
     * middleware. It will attach a parameter 'imperio' to the request object
     * that imperio's middle will use to pass and store connection data.
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @param {function} next - callback function to continue middleware chain
     */
    return (req, res, next) => {
      // Create an object on the req object that we can store stuff in
      req.imperio = {};
      req.imperio.connected = false;

      // Bind our middleware dependencies, then finally our middleware function
      const bpArgs = { extended: true };
      const em = imperioMiddleware.bind(null, req, res, next);
      const cp = cookieParser().bind(null, req, res, em);
      const bp = bodyParser.urlencoded(bpArgs).bind(null, req, res, cp);
      const ua = useragent.express().bind(null, req, res, bp);

      // Execute the bound chain of middleware
      ua();
    };
  };

  // Require socket.io and store a reference to the socket object on imperio
  const io = require('socket.io')(server);
  imperio.socket = io;
  // Initialize some objects on the imperio object for data handling
  imperio.openSockets = {};
  imperio.roomData = {};

  /* ------------------------
   * --  Socket Listeners  --
   * ------------------------ */
  io.on('connection', socket => {
    // keep track of sockets connected
    // console.log(`socket connected with id: ${socket.id}`);
    // imperio.openSockets[socket.id] = null;

    socket.on('createRoom', room => {
      // decrypt token here if using jwt's
      // console.log(`client ${socket.id} joined room ${room}`);
      // imperio.roomData[room] = imperio.roomData[room] || {
      //   connections: 0,
      //   clients: {},
      // };
      // const roomData = imperio.roomData[room];
      // roomData.connections += 1;
      // imperio.openSockets[socket.id] = room;
      // console.log('the open sockets are:', imperio.openSockets);
      socket.join(room);
    });
    // Handles client disconnect
    socket.on('disconnect', () => {
      // console.log(`${socket.id} disconnected`);
      io.emit('user disconnected');
    });

    // Mobile input socket listeners
    socket.on('tap', room => {
      console.log('Tap from mobile!');
      io.sockets.in(room).emit('tap');
    });
    socket.on('acceleration', (room, accObject) => {
      // console.log(`accel event received`);
      io.sockets.in(room).emit('acceleration', accObject);
    });
    socket.on('gyroscope', (room, gyroObject) => {
      // console.log(`gyro event received`);
      io.sockets.in(room).emit('gyroscope', gyroObject);
    });
    socket.on('gyroscopeTimer', (room, gyroObject, emitDate) => {
      io.sockets.in(room).emit('gyroscopeTimer', gyroObject, emitDate, Date.now());
    });
  });
  return imperio;
}

module.exports = initializeImperio;
