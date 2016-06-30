// 'use strict';
const socket = io();

const bodyElement = document.querySelector('body');
const h6Element = document.querySelector('h6');
const accelDiv = document.getElementById('accel');
const gyroDiv = document.getElementById('gyro');
const aX = document.getElementById('acceleration-x');
const aY = document.getElementById('acceleration-y');
const aZ = document.getElementById('acceleration-z');
const alpha = document.getElementById('alpha');
const beta = document.getElementById('beta');
const gamma = document.getElementById('gamma');
const room = frontEndEcho.Cookies.get('roomId');

// const echo = require('./../library/client/mainClient.js');

const test1 = frontEndEcho.test1;

// Add nonce code to screen for mobile users to enter
document.getElementById('nonceContainer').innerHTML = `Mobile code: ${frontEndEcho.Cookies.get('nonce')}`;

function changeBodyClass() {
  if (bodyElement.classList.contains('class1')) {
    bodyElement.classList.remove('class1');
    bodyElement.classList.add('class2');
  } else {
    bodyElement.classList.remove('class2');
    bodyElement.classList.add('class1');
  }
}

function updateAccelerationData(accelerationDataObject) {
  aX.innerHTML = `${accelerationDataObject.x}`;
  aY.innerHTML = `${accelerationDataObject.y}`;
  aZ.innerHTML = `${accelerationDataObject.z}`;
}

function updateGyroscopeData(gyroscopeDataObject) {
  alpha.innerHTML = `${gyroscopeDataObject.alpha}`;
  beta.innerHTML = `${gyroscopeDataObject.beta}`;
  gamma.innerHTML = `${gyroscopeDataObject.gamma}`;
}



// Use roomId from cookies to create a room
socket.on('connect', () => {
  h6Element.innerHTML = `Socket connection, in ${room}`;
  socket.emit('createRoom', room);
});

// Define socket listeners and callback functions
socket.on('tap', changeBodyClass);
socket.on('acceleration', updateAccelerationData);
socket.on('gyroscope', updateGyroscopeData);
