import Hammer from '../.././hammer.min.js';

const rotateStartEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.get('rotate').set({ enable: true });
  hammertime.on('rotatestart', event => {
    // const rotateData = {};
    // rotateData.direction = event.additionalEvent;
    // rotateData.scale = event.scale;
    imperio.socket.emit('rotateStart', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = rotateStartEmitter;