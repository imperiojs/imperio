import Hammer from '../.././hammer.min.js';

const pressEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.on('press', event => {
    imperio.socket.emit('press', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = pressEmitter;
