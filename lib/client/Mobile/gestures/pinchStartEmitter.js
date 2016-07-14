import Hammer from '../.././hammer.min.js';

const pinchStartEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.get('pinch').set({ enable: true });
  hammertime.on('pinchstart', event => {
    const pinchData = {};
    pinchData.direction = event.additionalEvent;
    pinchData.scale = event.scale;
    imperio.socket.emit('pinchstart', imperio.room, pinchData);
    if (callback) callback(pinchData);
  });
};

module.exports = pinchStartEmitter;
