'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');

app.use(express.static(path.join(`${__dirname}/../client`)));
app.use(useragent.express());

app.get('/', (req, res) => {
  if (res.useragent && res.useragent.isMobile) {
    res.render('../client/mobile.html');
  } else if (res.useragent && res.useragent.isDesktop) {
    res.render('../client/browser.html');
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
