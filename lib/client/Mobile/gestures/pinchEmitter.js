function buildPinchObject(panEventObject) {
  const pinchObject = {};
  pinchObject.center = panEventObject.center;
  pinchObject.deltaX = panEventObject.deltaX;
  pinchObject.deltaY = panEventObject.deltaY;
  pinchObject.velocityX = panEventObject.velocityX;
  pinchObject.velocityY = panEventObject.velocityY;
  pinchObject.direction = panEventObject.additionalEvent;
  pinchObject.deltaTime = panEventObject.deltaTime;
  pinchObject.rotation = panEventObject.rotation;
  pinchObject.angle = panEventObject.angle;
  pinchObject.start = false;
  pinchObject.end = false;
  return pinchObject;
}

const pinchEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.get('pinch').set({ enable: true });
  hammertime.on('pinch', event => {
    const pinchData = {};
    pinchData.type = 'pinch';
    pinchData.direction = event.additionalEvent;
    pinchData.scale = event.scale;
    imperio.socket.emit('pinch', imperio.room, event);
    if (callback) callback(pinchData);
  });
  hammertime.on('pinchstart', event => {
    const pinchData = {};
    pinchData.type = 'pinch';
    pinchData.direction = event.additionalEvent;
    pinchData.scale = event.scale;
    pinchData.start = true;
    imperio.socket.emit('pinch', imperio.room, event);
    if (callback) callback(pinchData);
  });
  hammertime.on('pinchend', event => {
    const pinchData = {};
    pinchData.type = 'pinch';
    pinchData.direction = event.additionalEvent;
    pinchData.scale = event.scale;
    pinchData.end = true;    
    imperio.socket.emit('pinch', imperio.room, event);
    if (callback) callback(pinchData);
  });
};

module.exports = pinchEmitter;
