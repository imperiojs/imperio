import Hammer from '../.././hammer.min.js';

const rotateEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.get('rotate').set({ enable: true });
  hammertime.on('rotate', event => {
    // const rotateData = {};
    // rotateData.direction = event.additionalEvent;
    // rotateData.scale = event.scale;
    imperio.socket.emit('rotate', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = rotateEmitter;