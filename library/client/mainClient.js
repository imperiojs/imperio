'use strict';
const socket = io();
import Cookies from './../../client/lib/cookies-js/dist/cookies.js';
let frontEndEcho = {};
frontEndEcho.Cookies = Cookies;

if (typeof module === 'undefined')
  module.exports = frontEndEcho;
else {
  window.frontEndEcho = frontEndEcho;
}
