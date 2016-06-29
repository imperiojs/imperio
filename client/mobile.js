// var request = require('browser');
var socket = io();

var h1Element = document.querySelector('h1');
var h2Element = document.querySelector('h2');
var h3Element = document.querySelector('h3');
var room = Cookies.get('roomId');

socket.on('connect', function() {
  h1Element.innerHTML = `inside socket connect, room is ${room}`;
  socket.emit('createRoom', room);
});

// function to emit tap event
function emitTap() {
  console.log('Tap Event Emitted');
  socket.emit('tap', room);
}

// tapping into phone sensor functionality
// if (window.DeviceMotionEvent==undefined) {
// }

function printAccelerationData(x, y, z) {
  h2Element.innerHTML = `Ax is ${x}, Ay is ${y}, Az is ${z}`;
}

// accelerometer data
window.ondevicemotion = function (event) {
  var ax = Math.round(event.accelerationIncludingGravity.x);
  var ay = Math.round(event.accelerationIncludingGravity.y);
  var az = Math.round(event.accelerationIncludingGravity.z);
  var rotation = event.rotationRate;
  if (rotation != null) {
    var arAlpha = Math.round(rotation.alpha);
    var arBeta = Math.round(rotation.beta);
    var arGamma = Math.round(rotation.gamma);
  }
  // h2Element.innerHTML= 'inside accelerometer';
  printAccelerationData(ax, ay, az);
  var accObject = {
    x: ax,
    y: ay,
    z: az,
  };
  socket.emit('acceleration', room, accObject);
};

function printGyroscopeData(alpha, beta, gamma) {
  h3Element.innerHTML = `alpha is ${alpha}, beta is ${beta}, gamma is ${gamma}`;
}

// gyroscope data
window.ondeviceorientation = function (event) {
  var alpha = Math.round(event.alpha);
  var beta = Math.round(event.beta);
  var gamma = Math.round(event.gamma);
  printGyroscopeData(alpha, beta, gamma);
  var gyroObject = {
    alpha,
    beta,
    gamma,
  };
  socket.emit('gyroscope', room, gyroObject);
};
