const onDataChannelCreated = () => {
  if (imperio.channel) {
    imperio.channel.onopen = () => {
      console.log('CHANNEL opened!!!');
    };
  }
};

module.exports = onDataChannelCreated;
