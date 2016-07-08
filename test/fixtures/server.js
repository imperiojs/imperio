"use strict"; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); // eslint-disable-line
const path = require('path');
const port = process.env.PORT || 3000;
const imperio = require('./../../index.js')(server);

//app.use(express.static(path.join(`${__dirname}/../client`)));
app.use(express.static(path.join(`${__dirname}/../node_modules/imperio`)));
app.set('view engine', 'ejs');
// app.use(imperio.init());

/* ------------------
 * --    Routes    --
 * ------------------ */

// App will serve up different pages for client & desktop
app.get('/', imperio.init(),
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
app.post('/', imperio.init(),
  (req, res) => {
    if (req.useragent && req.useragent.isMobile) {
      // TODO Validate nonce match, if it doesn't, serve rootmobile
      if (req.imperio.connected) {
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
app.get('*', imperio.init(), (req, res) => {
  res.status(404)
     .render(`${__dirname}/../client/rootmobile`,
             { error: 'Please enter code to connect to browser' });
});

/* ------------------
 * --    Server    --
 * ------------------ */

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
