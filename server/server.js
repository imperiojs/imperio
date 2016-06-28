"use strict"; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); //eslint-disable-line
const io = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');

const activeConnectRequests = {};
const desktopController = require('./desktopController.js');
const mobileController = require('./mobileController.js');

app.use(express.static(path.join(`${__dirname}/../client`)));
app.use(useragent.express());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());
app.set('view engine', 'ejs');

/* ------------------
 * --    Routes    --
 * ------------------ */

// App will serve up different pages for client & desktop
app.get('/',
  desktopController.handleRequest(activeConnectRequests),
  mobileController.handleRequest(activeConnectRequests),
  (req, res) => {
    if (req.useragent && req.useragent.isDesktop) {
      res.sendFile(path.join(`${__dirname}/../client/browser.html`));
      // res.render(`../client/browser.html`);
    } else if (req.useragent && req.useragent.isMobile) {
      //TODO if token is on request, sent to tap in appropriate room
      res.render(`${__dirname}/../client/rootmobile`, {error: null});
      // res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
    }
  }
);
app.post('/',
  mobileController.handlePost(activeConnectRequests),
  (req, res) => {
    res.render(`${__dirname}/../client/tapmobile`, {error: null});
  }
);
// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .render(`${__dirname}/../client/rootmobile`,{error: "Please enter code to connect to browser"});
});

/* ------------------
 * --   Sockets    --
 * ------------------ */

io.on('connection', socket => {
  console.log('A socket has a connection');
  socket.on('createRoom', room => {
    console.log(`Joined ${room}`);
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
});

/* ------------------
 * --    Server    --
 * ------------------ */

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
