const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const { owners_id } = require('../../config.json');

exports.run = async(client, message, args, color, prefix) => {
  
  if(!message.member.hasPermission('MANAGE_GUILD') && message.author.id !== '292936070603997185') return message.channel.send(`This command require you Manage Server permission`)
  
var option = args.join(" ")
            if (!option) {
              var embed1 = new MessageEmbed()
              .setAuthor(`${client.user.username} Logging`, client.user.displayAvatarURL({dynamic: true, format: "png"}))
              .setColor('RANDOM')
              .setDescription(`
**Proper Usage:**
• ${prefix}logging set \`#tagchannel\`
• ${prefix}logging on
• ${prefix}logging off

**Example:**
• ${prefix}logging set \`#mod-log\`

**After do that, do again:**
• ${prefix}logging on
`)
              .setFooter("Logging Announcement")
              .setTimestamp()
              message.channel.send(embed1);
            } else {
              if (option.match("set")) {
            if (!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== '292936070603997185') return message.channel.send(`**${message.author.username}**, Sorry, You need permission \`Manage Guild\` to use this command!`);
            let channel = message.mentions.channels.first()
            db.set(`loggingchnl_${message.guild.id}`, channel.id)
              
              var embed2 = new MessageEmbed()
              .setColor(color)
              .setDescription(`Logging channel set to: ${channel}`)
              .setTimestamp().setFooter(`Logging channel`, client.user.displayAvatarURL({dynamic: true, format: "png"}))    
              message.channel.send(embed2);
            }
            }
  
            if (option.match("on")) {
              if (!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== '292936070603997185') return message.channel.send(`**${message.author.username}**, Sorry, You need permission \`Manage Guild\` to use this command!`);
             let welcomesetting = 'on'
              db.set(`logging_${message.guild.id}`, welcomesetting)
                var embed3 = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`Logging has been set **on**.`)
                .setTimestamp()
                .setFooter("Logging enabled", client.user.displayAvatarURL({dynamic: true, format: "png"}))
                
                message.channel.send(embed3);
            }
            if (option.match("off")) {
              if (!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== '292936070603997185') return message.channel.send(`**${message.author.username}**, Sorry, You need permission \`Manage Guild\` to use this command!`);
              let welcomesetting = 'off'
              db.set(`logging_${message.guild.id}`, welcomesetting)
                var embed4 = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`Logging has been set **off**.`)
                .setTimestamp()
                .setFooter("Logging disabled", client.user.displayAvatarURL({dynamic: true, format: "png"}))
                
                message.channel.send(embed4);
            } 
} 

exports.conf = {
  aliases: ['log'], 
  cooldown: '3'
} 
exports.help = {
  name: 'logging', 
  description: 'Set the logging to the channel like \`Message Edited\`, \`Message Deleted\` and more!', 
  usage: 'logging'
} 