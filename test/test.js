'use strict';

const expect = require ('chai').expect,
  io = require('socket.io-client'),
  url = 'http://localhost:3000',
  options = {
    transports: ['websocket'],
    'force new connection': true,
  };
  // user1 = {
  //   name: 'Maam',
  // };

describe("socket connection", () => {
  it('should broadcast a username once connected', (done) => {
    const client = io.connect(url, options);

    client.on('tap', () => {
      client.emit('tap');
    });
  });
});
