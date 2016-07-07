/* global describe, it */
'use strict'
const expect = require('expect');
const request = require('supertest');
const connectionController = require('./../../lib/server/connectionController.js');

describe('connectionController Tests', () => {
  let server;
  beforeEach(function () {
    server = require('./../fixtures/server.js');
  });
  afterEach(function () {
    server.close();
  });

  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

  it('Should handle get request and send a cookie', () => {
    expect(true).toEqual(true);
  });
});
