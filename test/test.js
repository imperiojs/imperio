'use strict';

const expect = require ('chai').expect,
  io = require('socket.io-client'),
  url = 'http://localhost:3000',
  body = require('../client/browser.js'),
  options = {
    transports: ['websocket'],
    'force new connection': true,
  },
  user1 = {
    name: 'Maam',
  };

describe('socket connection', ()=>{
  it('should broadcast a string once connected', (done)=>{
    const client1 = io.connect(url, options);

    client1.on('tap', ()=>{
      console.log('connected');
      expect(body.classList.contains("class2")).to.equal(true);
    });
  });
});
