const onDataChannelCreated = () => {
  imperio.channel.onopen = () => {
    console.log('CHANNEL opened!!!');
  };
};

module.exports = onDataChannelCreated;
