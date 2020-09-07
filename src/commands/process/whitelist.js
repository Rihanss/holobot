const Discord = require("discord.js");
const fs = require("fs");
const { bot_admin } = require('../../config.json');
let blacklist = require("../../database/blacklist.json");
const db = require('quick.db')

exports.run = async (client, message, args, color) => {  
  if(!bot_admin.includes(message.author.id)) return;
    
 // const bl = client.channels.get("528193486969897001");

  let pUser = message.mentions.users.first() || client.users.find(m => m.id === args[0]);
      if (!pUser) return args.missing(message, 'Baka!!! Mention the user or give me the ID to blacklisted.', client.commands.get('whitelist').help);
    if(pUser.id === message.author.id) return message.channel.send(`You cannot whitelist yourself!`)
  if(pUser.id === "292936070603997185") return;
  
  pUser.send(`You has been unbanned. Next time please follow our rules at https://holo-bot.glitch.me/rules.html`).catch(error => message.channel.send(`I tried to send message to that user but seems like their dm is off!`))
    client.channels.get("619106739731693571").send(`**${pUser.id}** has been unbanned`)
    client.blacklist.delete(pUser.id)
    
    
  message.channel.send(`**${pUser.id}** has been whitelisted.`);
}

exports.conf = {
    aliases: ["wl"]
}

exports.help = {
    name: 'whitelist',
    description: 'To whitelist someone from using Conan',
    usage: 'whitelist <@Mention | ID>'
   } 