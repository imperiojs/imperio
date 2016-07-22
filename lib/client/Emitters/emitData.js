const emitData = (callback, data) => {
  if (imperio.connectionType === 'webRTC') {
    const webRTCData = {
      data,
      type: 'data',
    };
    imperio.dataChannel.send(JSON.stringify(webRTCData));
  } else imperio.socket.emit('data', imperio.room, data);
  if (callback) callback(data);
};

module.exports = emitData;
