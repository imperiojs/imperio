import Hammer from '../.././hammer.min.js';

const panStartEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.on('panstart', event => {
    imperio.socket.emit('panStart', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = panStartEmitter;
