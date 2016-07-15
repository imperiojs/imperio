import Hammer from '../.././hammer.min.js';

const panEndEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.on('panend', event => {
    imperio.socket.emit('panEnd', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = panEndEmitter;
