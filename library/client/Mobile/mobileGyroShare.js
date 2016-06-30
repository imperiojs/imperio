const socket = io();
import getCookie from './../getCookie.js';
const room = getCookie('roomId');

// gyroscope data
const mobileGyro = callback => {
  window.ondeviceorientation = event => {
    const alpha = Math.round(event.alpha);
    const beta = Math.round(event.beta);
    const gamma = Math.round(event.gamma);
    const gyroObject = {
      alpha,
      beta,
      gamma,
    };
    socket.emit('gyroscope', room, gyroObject);
    callback(gyroObject);
  };
};

module.exports = mobileGyro;
