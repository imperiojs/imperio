"use strict"; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); // eslint-disable-line
const path = require('path');
const echo = require('./../library/server/mainServer.js')(server);

app.use(express.static(path.join(`${__dirname}/../client`)));
app.set('view engine', 'ejs');
app.use(echo.init());

/* ------------------
 * --    Routes    --
 * ------------------ */

// App will serve up different pages for client & desktop
app.get('/',
  (req, res) => {
    if (req.useragent && req.useragent.isDesktop) {
      res.sendFile(path.join(`${__dirname}/../client/browser.html`));
      // res.render(`../client/browser.html`);
    } else if (req.useragent && req.useragent.isMobile) {
      // TODO if token is on request, sent to tap in appropriate room
      res.render(`${__dirname}/../client/rootmobile`, { error: null });
      // res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
    }
  }
);
app.post('/',
  (req, res) => {
    if (req.useragent && req.useragent.isMobile) {
      // TODO Validate nonce match, if it doesn't, serve rootmobile
      console.log(req.echo);
      if (req.echo.connected) {
        res.render(`${__dirname}/../client/tapmobile`, { error: null });
      } else {
        res.render(`${__dirname}/../client/rootmobile`, { error: null });
      }
    } else {
      res.status(404)
         .render(`${__dirname}/../client/browser.html`, { error: 'NO POST' });
    }
  }
);
// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .render(`${__dirname}/../client/rootmobile`,
             { error: 'Please enter code to connect to browser' });
});

/* ------------------
 * --    Server    --
 * ------------------ */

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
