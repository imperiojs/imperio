import Hammer from '../.././hammer.min.js';

const pinchEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.get('pinch').set({ enable: true });
  hammertime.on('pinch', event => {
    const pinchData = {};
    pinchData.type = 'pinch';
    pinchData.direction = event.additionalEvent;
    pinchData.scale = event.scale;
    imperio.socket.emit('pinch', imperio.room, pinchData);
    if (callback) callback(pinchData);
  });
};

module.exports = pinchEmitter;
