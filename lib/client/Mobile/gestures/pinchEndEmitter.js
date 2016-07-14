import Hammer from '../.././hammer.min.js';

const pinchEndEmitter = element => {
  const hammertime = new Hammer(element);
  hammertime.get('pinch').set({ enable: true });
  hammertime.on('pinchend', (event, callback) => {
    const pinchData = {};
    pinchData.direction = event.additionalEvent;
    pinchData.scale = event.scale;
    imperio.socket.emit('pinchend', imperio.room, pinchData);
    if (callback) callback(pinchData);
  });
};

module.exports = pinchEndEmitter;
