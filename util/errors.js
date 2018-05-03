const Discord = require('discord.js');
const config = require('../config.json');

// Used if there is no #tweet channel in the guild
module.exports.noTweetChannel = (message, perm) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setColor(config.red)
  .setDescription('Sorry, I could not find the `#tweet` channel.');

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};

// Used if a user does not specify a number of messages to purge
module.exports.emptyMessage = (message) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription('Please specify the message you would like to tweet, you cannot send an empty tweet.')
  .setColor(config.red);

  message.channel.send(embed).then(message => message.delete(config.errortimeout));
};
