'use strict'; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); //eslint-disable-line
const io = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');

app.use(express.static(path.join(`${__dirname}/../client`)));
app.use(useragent.express());
app.set('view engine', 'ejs');

/* ------------------
 * --    Routes    --
 * ------------------ */

// App will serve up different pages for client & desktop
app.get('/', (req, res) => {
  console.log(`request received`);
  if (req.useragent && req.useragent.isMobile) {
    console.log(`we're in the mobile`);
    res.render(`${__dirname}/../client/rootmobile`);
    // res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
  } else if (req.useragent && req.useragent.isDesktop) {
    console.log(`we're in the browser`);
    res.sendFile(path.join(`${__dirname}/../client/browser.html`));
    // res.render(`../client/browser.html`);
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

server.listen(8080, () => {
  console.log('Listening on port 8080');
});
