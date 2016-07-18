const rotateEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.get('rotate').set({ enable: true });
  hammertime.on('rotate', event => {
    event.start = false;
    event.end = false;
    imperio.socket.emit('rotate', imperio.room, event);
    if (callback) callback(event);
  });
  hammertime.on('rotatestart', event => {
    event.start = true;
    event.end = false;
    imperio.socket.emit('rotate', imperio.room, event);
    if (callback) callback(event);
  });
  hammertime.on('rotateend', event => {
    event.start = false;
    event.end = true;
    imperio.socket.emit('rotate', imperio.room, event);
    if (callback) callback(event);
  });
};

module.exports = rotateEmitter;
