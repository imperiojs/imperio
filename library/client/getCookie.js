// cookies-js is part of the bower dependencies
import Cookies from './../../client/lib/cookies-js/dist/cookies.js';
// Uses cookies-js to retrieve the cookie with the associated name.
// Required to display the nonce for mobile connections and to pull the roomID
// that sockets uses to establish the correct room.
function getCookie(name) {
  return Cookies.get(name);
}

module.exports = getCookie;
