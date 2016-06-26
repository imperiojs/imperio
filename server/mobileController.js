"use strict";
const mobileController = {};

mobileController.handleRequest = function(req, res) {
  console.log(`request is from Mobile`);
  res.render(`${__dirname}/../client/rootmobile`, {error: null});
  // res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
};

module.exports = mobileController;
