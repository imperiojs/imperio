"use strict"; // eslint-disable-line
/* eslint-disable no-console, global-require, no-param-reassign */
function initializeImperio(server) {
  const imperio = {};
  imperio.connectionController = require('./lib/server/connectionController.js');
  imperio.nonceController = require('./lib/server/nonceController.js');
  imperio.activeConnectRequests = {};
  imperio.clientRooms = {};
  // set global imperio config variables. TODO have these set with config object
  imperio.globalRoomLimit = 4;
  imperio.connectRequestTimeout = 1000 * 60 * 5; // 5 minutes

  /**
   * Returns a function to be used as express middleware. Dependency middleware
   * is invoked before imperio middleware is invoked. Middleware handles the
   * creation of connection sessions and authenticates connections to these
   * sessions.
   * @return {function} express middleware
   */
  imperio.init = function imperioInit() {
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
      // Provide useragent properties to the imperio object
      req.imperio.isDesktop = req.useragent.isDesktop;
      req.imperio.isMobile = req.useragent.isMobile;

      if (req.method === 'GET') {
        // check for nonce in param and query and create session if not found
        that.connectionController.handleGet(req, res, that.activeConnectRequests);
      } else if (req.method === 'POST') {
        // Else if this is a post request (for now, at '/'), run these
        // 'codeCheck' is our currently provided var in the body to attach the nonce
        // TODO: make codeCheck configurable in the user config.
        that.connectionController.handlePost(req, res, that.activeConnectRequests, 'codeCheck');
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
      const boundImperioMiddleware = imperioMiddleware
            .bind(null, req, res, next);
      const boundCookieParserMiddleware = cookieParser()
            .bind(null, req, res, boundImperioMiddleware);
      const boundBodyParserJsonMiddleware = bodyParser.json()
            .bind(null, req, res, boundCookieParserMiddleware);
      const boundBodyParserUrlMiddleware = bodyParser.urlencoded({ extended: true })
            .bind(null, req, res, boundBodyParserJsonMiddleware);
      const boundUserAgentMiddleware = useragent.express()
            .bind(null, req, res, boundBodyParserUrlMiddleware);

      // Execute the bound chain of middleware
      boundUserAgentMiddleware();
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

    socket.on('createRoom', clientData => {
      handleCreateRoom(socket, clientData);
    });
    // Handles client disconnect
    socket.on('disconnect', () => {
      const room = imperio.clientRooms[socket.id] || false;
      if (room) {
        io.sockets.in(room).emit('updateRoomData', io.sockets.adapter.rooms[room]);
        delete imperio.clientRooms[socket.id];
      }
    });

    // client input socket listeners
    socket.on('swipeleft', room => {
      console.log('Swipe Left from Mobile');
      io.sockets.in(room).emit('swipeleft');
    });

    socket.on('swiperight', room => {
      console.log('Swipe right from Mobile');
      io.sockets.in(room).emit('swiperight');
    });

    socket.on('swipeup', room => {
      console.log('Swipe up from Mobile');
      io.sockets.in(room).emit('swipeup');
    });

    socket.on('swipedown', room => {
      console.log('Swipe down from Mobile');
      io.sockets.in(room).emit('swipedown');
    });

    socket.on('tap', room => {
      // console.log('Tap from mobile!');
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
    socket.on('geoLocation', (room, locationObject) => {
      // console.log(`location event received`);
      io.sockets.in(room).emit('geoLocation', locationObject);
    });
    socket.on('gyroscopeTimer', (room, gyroObject, emitDate) => {
      io.sockets.in(room).emit('gyroscopeTimer', gyroObject, emitDate, Date.now());
    });
    socket.on('updateNonceTimeouts', (room) => {
      imperio.nonceController.handleNonceTimeout(
        io, socket, room, imperio.activeConnectRequests, imperio.connectRequestTimeout
      );
    });
  });

  function handleCreateRoom(socket, clientData) {
    const room = clientData.room;
    const clientRole = clientData.role;

    let roomData = io.sockets.adapter.rooms[room];
    // if no room exists, receiver will create it.
    // OR if room exists and there's space in it, emitter will join
    if (!roomData || roomData.length < imperio.globalRoomLimit) {
      socket.join(room);
      roomData = io.sockets.adapter.rooms[room];
      roomData.sockets[socket.id] = clientRole; // TODO can I do this?
      imperio.clientRooms[socket.id] = room;
      io.sockets.in(room).emit('updateRoomData', roomData);
    } else {
      roomData.limit = imperio.globalRoomLimit;
      io.sockets.in(room).emit('roomFull', roomData);
    }
  }

  // Return imperio object
  return imperio;
}

module.exports = initializeImperio;
