// 'use strict';
const socket = io();
const bodyElement = document.querySelector('body');
const h6Element = document.querySelector('h6');
const accelDiv = document.getElementById('accel');
const gyroDiv = document.getElementById('gyro');

let room = Cookies.get('roomId');
// let room = document.cookie.slice(5);

socket.on('connect', () => {
  h6Element.innerHTML = `Socket connection, in ${room}`;
  socket.emit('createRoom', room);
});
socket.on('tap', changeBody);

socket.on('acceleration', (accelObject) => {
  accelDiv.innerHTML = `Ax is ${accelObject.x}, Ay is ${accelObject.y}, Az is ${accelObject.z}`;
});

socket.on('gyroscope', (gyroObject) => {
  gyroDiv.innerHTML = `alpha is ${gyroObject.alpha}, beta is ${gyroObject.beta}, gamma is ${gyroObject.gamma}`;
});

function changeBody () {
  if (bodyElement.classList.contains('class1')) {
    bodyElement.classList.remove('class1');
    bodyElement.classList.add('class2');
    bodyElement.innerHTML = "Project-start works!"
  } else {
    bodyElement.classList.remove('class2');
    bodyElement.classList.add('class1');
    bodyElement.innerHTML = "Hello, EchoLoJS"
  }
}

(function() {
  document.getElementById('nonceContainer').innerHTML = 'Enter this into your phone, please: ' + Cookies.get('nonce');
})();

// use browser event to change class
// document.addEventListener('click', changeBody, false);
