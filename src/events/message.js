const { MessageEmbed } = require("discord.js");
const PREFIX = require('../config.json').bot_prefix
const fs =  require("fs");
const db = require("quick.db");

module.exports = async(client, message) => {
    if(message.author.bot || !message.guild) return;

    let prefix = PREFIX.toLowerCase();
    let prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    let msg = message.content.toLowerCase();
    prefixMention = prefix;

    if (msg.startsWith(prefix) || msg.startsWith(`${client.user.toString()} `)) return require('../handle/command')(client, message);
    if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
      message.channel.send(`Hello, **${message.author}** my prefix is \`${prefix}\``);
    };
    
    const args = message.content.slice(prefix).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let AFKdata = JSON.parse(fs.readFileSync('./src/database/afk.json', 'utf8'));
    if (message.author.id in AFKdata && command !== "afk") {
      delete AFKdata[message.author.id];
      fs.writeFile('./src/database/afk.json', JSON.stringify(AFKdata), (err) => {
        if (err) console.log(err);
      });
      message.channel.send(`⌨️ | Welcome back ${message.author.toString()} I've removed you from AFK Mode.`).then(m => m.delete(20000))
    };
    let AFKcheck = user => {
      return user.id in AFKdata
    };
    const AFKandMentioned = message.mentions.users.filter(AFKcheck);
    if(AFKandMentioned.size) {
      var reason = AFKandMentioned.map(user => {
        return AFKdata[user.id];
      });
      let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`They are AFK at the moment, please try again later!`)
      .setDescription(`${reason}`)
      message.channel.send(`${message.author.toString()}`, {embed}).then(m => m.delete(20000))
    };
  }