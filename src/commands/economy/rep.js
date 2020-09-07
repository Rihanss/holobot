const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags")
const rep = require("../../../src/database/rep.json");
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async(client, message, args) => {
  try {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) return message.channel.send(`You can award a Reputation Point! 👍🏻\n\nYou must mention a user to give a Reputation Point to...`);
    if (user.id == message.author.id) return message.channel.send(`Trying to rep yourself huh? 😛\n\nYou can't give a Rep Point to yourself!`);
    if (user.bot) return message.channel.send(`You can't give a Rep Point to Bots!`);
    let lastrep = await db.fetch(`lastRep_${message.author.id}`);
    let cooldown = 4.32e+7;
    let amount = 1;

    if (lastrep !== null && cooldown - (Date.now() - lastrep) > 0) {
      let timeObj = ms(cooldown - (Date.now() - lastrep));
      let eh = require('../../../src/handle/cooldownAns.json');
      let ops = eh[Math.floor(Math.random() * eh.length)];
      message.channel.send(`**${message.author.username}**, ${ops} (Ratelimited)\n**You'll be able give reputation point again in ${timeObj.hours} hours, ${timeObj.minutes} minutes and ${timeObj.seconds} seconds**`);
  } else {
    db.set(`lastRep_${message.author.id}`, Date.now());        
    db.add(`rep_${user.id}`, amount);
    
    const embed = new MessageEmbed()
    .setColor('#39ce41')
    .setTitle('**Rep ✅**')
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setDescription(stripIndents`
    **${message.author.username}** just gave a Reputation Point!
    **Given to »** **${message.mentions.users.first().username}!** 😎
    `)
    .setFooter('12 Hour Cooldown | z-leaderboard rep for Leaderboard')
    message.channel.send(embed);    
    
  }
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``)
  };
};

exports.conf = {
  aliases: ["reputation"],
  cooldown: "5"
};

exports.help = {
  name: 'rep',
  description: 'Give someone a reputation point, how cool',
  usage: 'rep <@mention>'
};