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
const room = document.cookie.slice(7, 43);

// Add nonce code to screen for mobile users to enter
document.getElementById('nonceContainer').innerHTML = `Mobile code:
  ${document.cookie.slice(-5)}`;

function changeBodyClass() {
  console.log(`let's change body`);
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

function showSocketConnection() {
  h6Element.innerHTML = `Socket connection, in ${room}`;
}

// Use roomId from cookies to create a room
frontEndEcho.desktopRoomSetup(showSocketConnection);

// Define socket listeners and callback functions
frontEndEcho.desktopTapHandler(changeBodyClass);
frontEndEcho.desktopAccelHandler(updateAccelerationData);
frontEndEcho.desktopGyroHandler(updateGyroscopeData);

