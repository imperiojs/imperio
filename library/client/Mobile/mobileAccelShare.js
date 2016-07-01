// const socket = io();
// import getCookie from './../getCookie.js';
// const room = getCookie('roomId');

const mobileAccel = (socket, room, callback) => {
  window.ondevicemotion = event => {
    const ax = Math.round(event.accelerationIncludingGravity.x);
    const ay = Math.round(event.accelerationIncludingGravity.y);
    const az = Math.round(event.accelerationIncludingGravity.z);
    // var rotation = event.rotationRate;
    // if (rotation != null) {
    //   var arAlpha = Math.round(rotation.alpha);
    //   var arBeta = Math.round(rotation.beta);
    //   var arGamma = Math.round(rotation.gamma);
    // }
    const accObject = {
      x: ax,
      y: ay,
      z: az,
    };
    socket.emit('acceleration', room, accObject);
    callback(accObject);
  };
};

module.exports = mobileAccel;
