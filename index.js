require('dotenv').config();
const Discord = require('discord.js');
const ytdl = require('ytdl-core')
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  const args = msg.content.split(/ +/)
  const command = args.shift().toLowerCase()
  console.info(`Called command: ${command}`)

  if (!bot.commands.has(command)) {
   if(command=="der"){
    if (msg.channel.type !== 'text') return
    
    const voiceChannel = msg.member.voice.channel

    if (!voiceChannel) {
      return msg.reply('please join a voice channel first!')
    }

    voiceChannel.join().then(connection => {
      const stream = ytdl('https://www.youtube.com/watch?v=ZZ5LpwO-An4', { filter: 'audioonly' })
      const dispatcher = connection.play(stream)

      dispatcher.on('end', () => voiceChannel.leave())
    })
   } else return
  }


  try {
    /*if(command=="der"){
      bot.commands.get(heman).execute(msg, args)
    }*/

    bot.commands.get(command).execute(msg, args)
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});

bot.on("guildMemberAdd", member => {
  member.send(
    `ok, seems like an invasion of privacy`
  )
})
