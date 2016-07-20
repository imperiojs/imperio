const emitData = (callback, data) => {
  if (imperio.connectionType === 'webRTC') {
    const webRTCData = {
      data,
      type: 'data',
    };
    imperio.dataChannel.send(webRTCData);
  } else imperio.socket.emit('data', imperio.room, data);
  if (callback) callback(data);
};

module.exports = emitData;
