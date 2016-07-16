import Hammer from '../.././hammer.min.js';

const swipeEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.on('swipe', event => {
    imperio.socket.emit('swipe', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = swipeEmitter;
