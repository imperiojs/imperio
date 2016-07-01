var h1Element = document.querySelector('h1');
var h2Element = document.querySelector('h2');
var h3Element = document.querySelector('h3');

frontEndEcho.mobileRoomSetup(frontEndEcho.socket, frontEndEcho.room, showRoomName);

// handle accel data using our library
frontEndEcho.mobileAccelShare(frontEndEcho.socket, frontEndEcho.room, printAccelerationData);

// handle gyro using our library
frontEndEcho.mobileGyroShare(frontEndEcho.socket, frontEndEcho.room, printGyroscopeData);

function printAccelerationData(accObj) {
  h2Element.innerHTML = `Ax is ${accObj.x}, Ay is ${accObj.y}, Az is ${accObj.z}`;
}

function printGyroscopeData(gyroObj) {
  h3Element.innerHTML = `alpha is ${gyroObj.alpha},
    beta is ${gyroObj.beta}, gamma is ${gyroObj.gamma}`;
}

function showRoomName() {
  h1Element.innerHTML = `inside socket connection, room is good`;
}
