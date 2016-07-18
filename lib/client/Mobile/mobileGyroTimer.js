
const mobileGyroTimer = callback => {
  window.ondeviceorientation = event => {
    const alpha = Math.round(event.alpha);
    const beta = Math.round(event.beta);
    const gamma = Math.round(event.gamma);
    const gyroObject = {
      alpha,
      beta,
      gamma,
    };
    const emitDate = Date.now();
    imperio.socket.emit('gyroscopeTimer', imperio.room, gyroObject, emitDate);
    if (callback) callback(gyroObject);
  };
};

module.exports = mobileGyroTimer;
