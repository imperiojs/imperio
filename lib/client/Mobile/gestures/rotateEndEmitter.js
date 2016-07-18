import Hammer from '../.././hammer.min.js';

const rotateEndEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.get('rotate').set({ enable: true });
  hammertime.on('rotateend', event => {
    // const rotateData = {};
    // rotateData.direction = event.additionalEvent;
    // rotateData.scale = event.scale;
    imperio.socket.emit('rotateEnd', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = rotateEndEmitter;