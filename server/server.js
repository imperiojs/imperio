'use strict'; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); //eslint-disable-line
const io = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const cookieParser = require('cookie-parser');
const cookieController = require('./cookieController')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(`${__dirname}/../client`)));
app.use(useragent.express());

/* ------------------
 * --    Routes    --
 * ------------------ */

// App will serve up different pages for client v& desktop
app.get('/', cookieController.countRooms, cookieController.setCookie, (req, res) => {
  console.log(`request received`);
  if (req.useragent && req.useragent.isMobile) {
    console.log(`we're in the mobile`);
    res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
  } else if (req.useragent && req.useragent.isDesktop) {
    console.log(`we're in the browser`);
    res.sendFile(path.join(`${__dirname}/../client/browser.html`));
  }
});

// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .sendFile(path.join(`${__dirname}/../client/404.html`));
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
