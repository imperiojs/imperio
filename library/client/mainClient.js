'use strict';
// const socket = io();
const frontEndEcho = {};
// import Cookies from './../../client/lib/cookies-js/dist/cookies.js';
// frontEndEcho.Cookies = Cookies;
// require('./../../client/lib/cookies-js/dist/cookies.js');
frontEndEcho.mobileTap = require('./Mobile/mobileTap.js');

if (typeof module === 'undefined') module.exports = frontEndEcho;
else window.frontEndEcho = frontEndEcho;
