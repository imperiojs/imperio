function buildPanObject(panEventObject) {
  const panObject = {};
  panObject.type = 'pan';
  panObject.center = panEventObject.center;
  panObject.deltaX = panEventObject.deltaX;
  panObject.deltaY = panEventObject.deltaY;
  panObject.velocityX = panEventObject.velocityX;
  panObject.velocityY = panEventObject.velocityY;
  panObject.direction = panEventObject.type;
  panObject.deltaTime = panEventObject.deltaTime;
  panObject.start = false;
  panObject.end = false;
  return panObject;
}

const panEmitter = (element, callback) => {
  const hammertime = new Hammer(element);
  hammertime.on('pan', event => {
    const panData = buildPanObject(event);
    if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
      imperio.dataChannel.send(JSON.stringify(panData));
    } else imperio.socket.emit('pan', imperio.room, panData);
    if (callback) callback(panData);
  });
  hammertime.on('panstart', event => {
    const panData = buildPanObject(event);
    panData.start = true;
    if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
      imperio.dataChannel.send(JSON.stringify(panData));
    } else imperio.socket.emit('pan', imperio.room, panData);
    if (callback) callback(panData);
  });
  hammertime.on('panend', event => {
    const panData = buildPanObject(event);
    panData.end = true;
    if (imperio.webRTCSupport === true && imperio.dataChannel && imperio.dataChannel.readyState === 'open') {
      imperio.dataChannel.send(JSON.stringify(panData));
    } else imperio.socket.emit('pan', imperio.room, panData);
    if (callback) callback(panData);
  });
};

module.exports = panEmitter;
