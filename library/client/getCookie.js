import Cookies from './../../client/lib/cookies-js/dist/cookies.js';

function getCookie(name) {
  return Cookies.get(name);
}

module.exports = getCookie;
