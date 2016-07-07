'use strict';

const expect = require('chai').expect;
const io = require('socket.io-client');
const url = 'http://localhost:3000';
// const body = require('../client/browser.js');
const options = {
  transports: ['websocket'],
  'force new connection': true,
};
const user1 = {
  name: 'Maam',
};

describe('socket connection', () => {
  it('should broadcast a string once connected', done => {
    const client1 = io.connect(url, options);
    client1.on('tap', ()=>{
      console.log('connected');
      expect(body.classList.contains("class2")).to.equal(true);
    });
  });
});
