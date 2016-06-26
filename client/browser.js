'use strict';

const socket = io();
const bodyElement = document.querySelector('body');

socket.on('tap', changeBody);

function changeBody () {
  if (bodyElement.classList.contains('class1')) {
    bodyElement.classList.remove('class1');
    bodyElement.classList.add('class2');
    bodyElement.innerHTML = "project-start works!"
  } else {
    bodyElement.classList.remove('class2');
    bodyElement.classList.add('class1');
    bodyElement.innerHTML = "Hello, EchoLoJS"
  }
}

(function() {
  document.getElementById('nonceContainer').innerHTML = 'Enter this into your phone, please: ' + Cookies.get('nonce');
})();

//use browser event to change class
// document.addEventListener('click', changeBody, false);
