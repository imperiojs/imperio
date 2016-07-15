import Hammer from '../.././hammer.min.js';

const panEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.on('pan', event => {
    imperio.socket.emit('pan', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = panEmitter;
