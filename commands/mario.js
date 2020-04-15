module.exports = {
  name: '-hallo',
  description: 'a wild Mario',
  execute(msg, args) {
    msg.reply('It´s a me');
    msg.channel.send('Mario!');
  },
};
