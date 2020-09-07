const { MessageEmbed } = require("discord.js");
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'nah', 'nope', 'nop'];
const db = require('quick.db');

exports.run = async(client, message, args) => {
  try {
    const user = message.mentions.users.first();
    const marrys = await db.fetch(`marry_${user.id}`);
    const married = await db.fetch(`marry_${message.author.id}`);

    if(!user) return args.missing(message, "You need to mention someone to marrr!", client.commands.get("marry").help);
    if(user.id === message.author.id) return message.channel.send(`You can't marry yourself!`);
    if(user.id === client.user.id) return message.channel.send("You can't marry me. I'm already taken :P");
    if(user.bot) return message.channel.send(`You can't marry them`);
    if(marrys) return message.channel.send('That user already married! Find another one.');
    if(married) return message.channel.send('Thats not good, You can\'t marry two times.');

    message.channel.send(`${user}, **${message.author.username}** is asking to marry you! Type \`yes\` to accept it or \`no\` to reject it! Answer in 30 seconds`)
    const hit = await verifyText(message.channel, user);
    if(hit) {
      db.set(`marry_${message.author.id}`, user.username);
      db.set(`married_${message.author.id}-${user.id}`, true);
      db.set(`marry_${user.id}`, message.author.username);
      db.set(`married_${user.id}-${message.author.id}`, true);
      message.channel.send(`${user} has accepted ${message.author} marriage! Congratulations!`);
    } else {
      message.channel.send(`${message.author}, seems like **${user.tag}** don't want to marry with you, you will be single right now 😐`);
    }; 
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``)
  };
};

async function verifyText(channel, user, time = 30000) {
  const filter = res => {
    const value = res.content.toLowerCase();
    return res.author.id === user.id && (yes.includes(value) || no.includes(value));
  };
  const verify = await channel.awaitMessages(filter, {
    max: 1,
    time
  });
  if (!verify.size) return 0;
  const choice = verify.first().content.toLowerCase();
  if (yes.includes(choice)) return true;
  if (no.includes(choice)) return false;
  return false;
};

exports.conf = {
  aliases: [], 
  cooldown: '5'
} 

exports.help = {
  name: 'marry', 
  description: 'Allow you to marry wity someone, also thats need a verify :p', 
  usage: 'marry @SomeOne', 
  example: ['marry @SomeLikeItHot'] 
} 