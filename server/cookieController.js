var cookieController = {};
var desktop = 0;
var mobile = 0;
cookieController.countRooms = countRooms;
cookieController.setCookie = setCookie;

function countRooms(req, res, next) {
  if (req.useragent && req.useragent.isMobile) {
    mobile++;
    console.log(`New mobile connection is ${mobile}`);
    req.body.roomNumber = mobile;
  } else if (req.useragent && req.useragent.isDesktop) {
    desktop++;
    console.log(`New desktop connection is ${desktop}`);
    req.body.roomNumber = desktop;
  }
  next();
}

function setCookie(req, res, next) {
  res.cookie('room', `room${req.body.roomNumber}`);
  next();
}

module.exports = cookieController;
