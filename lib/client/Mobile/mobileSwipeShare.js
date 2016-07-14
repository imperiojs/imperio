const mobileSwipeShare = {};

mobileSwipeShare.left = (socket, room, swipeElement, callback) => {
  // console.log("in mobileSwipe left");
  new Hammer(swipeElement).on('swipeleft', function(){
    swipeElement.innerHTML = "swiped-left has been emitted from Imperio";
    socket.emit('swipeleft', room);
    if (callback) callback();
  });
};


mobileSwipeShare.right = (socket, room, swipeElement, callback) => {
  // console.log("in mobileSwipe left");
  new Hammer(swipeElement).on('swiperight', function(){
    swipeElement.innerHTML = "swiped-right has been emitted from Imperio";
    socket.emit('swiperight', room);
    if (callback) callback();
  });
};

mobileSwipeShare.up = (socket, room, swipeElement, callback) => {
  // console.log("in mobileSwipe left");
  new Hammer(swipeElement).on('swipeup', function(){
    swipeElement.innerHTML = "swiped-up has been emitted from Imperio";
    socket.emit('swipeup', room);
    if (callback) callback();
  });
};
//
// mobileSwipeShare.down = (socket, room, swipeElement, callback) => {
//   // console.log("in mobileSwipe left");
//   new Hammer(swipeElement).on('swipedown', function(){
//     swipeElement.innerHTML = "swipedup has been emitted from Imperio";
//     socket.emit('swipedown', room);
//     if (callback) callback();
//   });
// };
module.exports = mobileSwipeShare;
