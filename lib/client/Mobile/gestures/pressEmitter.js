import Hammer from '../.././hammer.min.js';

const pressEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.on('press', event => {
    event.type = 'press';
    imperio.callbacks.press = callback;
    if (imperio.connectionType === 'webRTC') {
      imperio.dataChannel.send(JSON.stringify(event));
    } else imperio.socket.emit('press', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = pressEmitter;
