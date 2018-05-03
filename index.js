const Discord = require('discord.js');
const config = require('./config.json');
const token = require('./token.json');
const fs = require('fs');
const client = new Discord.Client({disableEveryone: true});
const twit = require('twit');
const errors = require('./util/errors.js');

// Bot Bootup Event
client.on('ready', async () => {
    let pluralnonpluralservers = (client.guilds.size > 1) ? 'Servers' : 'Server';
    let pluralnonpluralusers = (client.users.size > 1) ? 'Users' : 'User';

    console.log(`${client.user.username} is online and is operating on ${client.guilds.size} ${pluralnonpluralservers} for ${client.users.size} ${pluralnonpluralusers}.`);
    client.user.setActivity(`${client.guilds.size} ${pluralnonpluralservers} // ${client.users.size} ${pluralnonpluralusers}`, {type: 'PLAYING'});
    return
});

// Twitter Stuff
const twitter = new twit ({
  consumer_key: `${token.consumer_key}`,
  consumer_secret: `${token.consumer_secret}`,
  access_token: `${token.access_token}`,
  access_token_secret: `${token.access_token_secret}`,
  timeout_ms: 60*1000  // optional HTTP request timeout to apply to all requests.
});

// Message Handler
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  let prefix = config.prefix;
  let messageArray = message.content.split(' ');
  let args = messageArray.slice(1);

  if (message.content.startsWith(config.prefix + 'tweet')) {
    let tweetchannel = message.guild.channels.find('name', 'tweet');
    if (!tweetchannel) return errors.noTweetChannel(message);

    if (message.channel === tweetchannel) {
      let inputmessage = args.join(' ');
      if (!inputmessage) return errors.emptyMessage(message);
      if (message.channel === tweetchannel)
        twitter.post('statuses/update', { status: `${inputmessage}` }, function(err, data, response) {
            console.log('Tweet Successfully Tweeted!');
            console.log(`${message.author.username} has just Tweeted "${inputmessage}"`);
        })} else {
          let inputmessage = args.join(' ');
          console.log(`${message.author.username} attempted to Tweet "${inputmessage}", but failed because they were not in the right channel.`);
        }
      };
});

client.login(token.token);
