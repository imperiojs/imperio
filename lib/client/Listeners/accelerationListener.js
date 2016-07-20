// Sets up a listener for the acceleration event and expects to receive an object
// with the acceleration data in the form of {x: x, y:y, z:z}.
// Accepts 1 argument:
// 1. A callback function that will be run every time the acceleration event is triggered.
const accelerationListener = callback => {
  imperio.callbacks.acceleration = callback;
  imperio.socket.on('acceleration', accObject => {
    if (callback) callback(accObject);
  });
};

module.exports = accelerationListener;
