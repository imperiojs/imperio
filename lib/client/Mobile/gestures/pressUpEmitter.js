import Hammer from '../.././hammer.min.js';

const pressUpEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.on('pressup', event => {
    imperio.socket.emit('pressUp', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = pressUpEmitter;
