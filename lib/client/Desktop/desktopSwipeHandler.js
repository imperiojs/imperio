const desktopSwipeHandler= {};

desktopSwipeHandler.left = (socket, callback) => {
  socket.on('swipeleft', function(){
    if (callback) callback();
  });
}

desktopSwipeHandler.right = (socket, callback) => {
  socket.on('swiperight', function(){
    if (callback) callback();
  });
}

desktopSwipeHandler.up = (socket, callback) => {
  socket.on('swipeup', function(){
    if (callback) callback();
  });
}

desktopSwipeHandler.down = (socket, callback) => {
  socket.on('swipedown', function(){
    if (callback) callback();
  });
}

module.exports = desktopSwipeHandler;
