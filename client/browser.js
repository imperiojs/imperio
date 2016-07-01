// 'use strict';
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
const room = frontEndEcho.room;
const nonce = frontEndEcho.nonce;

// Add nonce code to screen for mobile users to enter
document.getElementById('nonceContainer').innerHTML = `Mobile code: ${nonce}`;


// Use roomId from cookies to create a room
frontEndEcho.desktopRoomSetup(frontEndEcho.socket, frontEndEcho.room);

function changeBodyClass() {
  // console.log(`let's change body`);
  if (bodyElement.classList.contains('class1')) {
    bodyElement.classList.remove('class1');
    bodyElement.classList.add('class2');
  } else {
    bodyElement.classList.remove('class2');
    bodyElement.classList.add('class1');
  }
}

function updateAccelerationData(accelerationDataObject) {
  console.log(`let's change accel`);
  aX.innerHTML = `${accelerationDataObject.x}`;
  aY.innerHTML = `${accelerationDataObject.y}`;
  aZ.innerHTML = `${accelerationDataObject.z}`;
}

function updateGyroscopeData(gyroscopeDataObject) {
  // console.log(`let's change gyro`);
  alpha.innerHTML = `${gyroscopeDataObject.alpha}`;
  beta.innerHTML = `${gyroscopeDataObject.beta}`;
  gamma.innerHTML = `${gyroscopeDataObject.gamma}`;
}

function showSocketConnection(room) {
  h6Element.innerHTML = `Socket connection, in ${room}`;
}


// Define socket listeners and callback functions
frontEndEcho.desktopTapHandler(frontEndEcho.socket, changeBodyClass);
frontEndEcho.desktopAccelHandler(frontEndEcho.socket, updateAccelerationData);
frontEndEcho.desktopGyroHandler(frontEndEcho.socket, updateGyroscopeData);
