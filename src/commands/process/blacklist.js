const fs = require("fs");
const { bot_admin } = require('../../config.json');
let blacklist = require("../../database/blacklist.json");
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

exports.run = async (client, message, args, color) => {  
  if(!bot_admin.includes(message.author.id)) return;
    let pUser = message.mentions.users.first() || client.users.find(m => m.id === args[0])
    let reason = args.slice(1).join(' ')
      if (!pUser) return args.missing(message, 'You will need to specify a User ID to blacklist.', client.commands.get('blacklist').help);
    if(pUser.id === message.author.id) return message.channel.send(`You cannot blacklist yourself, duh!`)
  if(pUser.id === "292936070603997185" && pUser.id === "341527559382499329") return;
  
  let embed = new MessageEmbed()
  .setAuthor(client.user.username, client.user.displayAvatarURL)
  .setTitle(`**Holo**`)
  .setDescription(`
You were banned from Holo.

Reason: ${reason || "No Reason"}
Banned by: ${message.author.tag}

**Wrongful Ban?**
Please appeal at **[our form.](https://forms.gle/iUYotw9cRBv3zdf39)**
`)
  
 // bl.send(`**${pUser.id}** has been excluded from using the bot.`)
    
    let data = client.blacklist.get(pUser.id)
  
    client.blacklist.set(pUser.id, {
      reason: reason || 'No reason',
      date: today,
      author: message.author.tag,
      blacklisted: "yes"
    })
    
  pUser.send(embed).catch(error => message.channel.send(`Tried to send message to ${pUser.id} but seems like their dm are off!`))
  message.channel.send(`**${pUser.id}** has been banned from using Holo.\n**Reason »** ${reason || `N/A`}\n\nThis Ban will need to have all evidence (screenshots, banned user, duration etc.) submitted to the NTM Dev Staff Panel: https://staff.natebot.xyz/\nFollow all instructions on the Moderation Guide before proceeding!`);
  client.channels.get("619106739731693571").send(`**${pUser.id}** has been banned!`)
    
/*
    db.delete(`currency_${pUser.id}`)
    db.delete(`fishy_${pUser.id}`)
    db.delete(`works_${pUser.id}`)
    db.delete(`info_${pUser.id}`)
    db.delete(`rep_${pUser.id}`)
    db.delete(`level_${pUser.id}`)
    db.delete(`doublexp_${pUser.id}`)
    db.delete(`doublecash_${pUser.id}`)
    */
 }


exports.conf = {
    aliases: ["bl"]
}

exports.help = {
    name: 'blacklist',
    description: 'To blacklist user from using the bot',
    usage: 'blacklist <@Mention | ID>' 
}