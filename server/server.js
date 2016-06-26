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
app.use(cookieParser());
app.set('view engine', 'ejs');

/* ------------------
 * --    Routes    --
 * ------------------ */

// App will serve up different pages for client & desktop
app.get('/', (req, res) => {
  console.log(`request received`);
  if (req.useragent && req.useragent.isDesktop) {
    desktopController.handleRequest(req, res);
  } else if (req.useragent && req.useragent.isMobile) {
    mobileController.handleRequest(req, res);
  }
});

app.post('/', (req,res)=>{

  const codeCheck = req.body;
  // db.find(codeCheck, functions()=>{
  //   //if correct then redirect to tap page
  //   //if incorrect then redirect to rootmobile page with error message
  // })

});
// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .render(`${__dirname}/../client/rootmobile`,{error: "Please enter code to connect to browser"});
});

/* ------------------
 * --   Sockets    --
 * ------------------ */

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('tap', () => {
    console.log('tap from mobile!');
    io.emit('tap');
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('user disconnected');
  });
});

/* ------------------
 * --    Server    --
 * ------------------ */

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
