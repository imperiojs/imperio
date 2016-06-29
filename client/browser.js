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


const room = Cookies.get('roomId');
document.getElementById('nonceContainer').innerHTML = `Enter this into your phone,
please: ${Cookies.get('nonce')}`;

socket.on('connect', () => {
  h6Element.innerHTML = `Socket connection, in ${room}`;
  socket.emit('createRoom', room);
});

socket.on('tap', changeBody);

socket.on('acceleration', (accelObject) => {
  aX.innerHTML = `${accelObject.x}`;
  aY.innerHTML = `${accelObject.y}`;
  aZ.innerHTML = `${accelObject.z}`;  
});

socket.on('gyroscope', (gyroObject) => {
  alpha.innerHTML = `${gyroObject.alpha}`;
  beta.innerHTML = `${gyroObject.beta}`;
  gamma.innerHTML = `${gyroObject.gamma}`;

});

function changeBody() {
  if (bodyElement.classList.contains('class1')) {
    bodyElement.classList.remove('class1');
    bodyElement.classList.add('class2');
    // bodyElement.innerHTML = 'Project-start works!';
  } else {
    bodyElement.classList.remove('class2');
    bodyElement.classList.add('class1');
    // bodyElement.innerHTML = 'Hello, EchoLoJS';
  }
}
