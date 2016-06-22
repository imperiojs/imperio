'use strict'; // eslint-disable-line
const express = require('express');
const app = express();
const http = require('http').Server(app); //eslint-disable-line
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');

app.use(express.static(path.join(`${__dirname}/../client`)));
app.use(useragent.express());

/* ------------------
 * --    Routes    --
 * ------------------ */

// App will serve up different pages for client v& desktop
app.get('/', (req, res) => {
  console.log(`request received`);
  if (req.useragent && req.useragent.isMobile) {
    console.log(`we're in the mobile`);
    // res.render(`${__dirname}/../client/mobile.html`);
    res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
  } else if (req.useragent && req.useragent.isDesktop) {
    console.log(`we're in the browser`);
    res.sendFile(path.join(`${__dirname}/../client/browser.html`));
    // res.render(`../client/browser.html`);
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

io.on('connection', (socket) => {
  console.log('a user connected:', socket);
  socket.on('tap', () => {
    console.log('tap from mobile!');
    io.emit('tap');
  });
  socket.on('disconnect', () => {
    io.emit('user disconnected');
  });
});

/* ------------------
 * --    Server    --
 * ------------------ */

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
