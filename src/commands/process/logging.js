const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args, perms, prefix) => {
   if(message.author.id !== "292936070603997185") return;
  // if(!message.member.hasPermission(`MANAGE_GUILD`) && message.author.id !== "292936070603997185") return message.channel.send(`You need permission to manage server to use this command`)
    let option = args.join(" ")
    if(!option) {
      const embed = new MessageEmbed()
      .setTitle(`**Logging**`)
      .setColor(`RANDOM`)
      .setDescription(stripIndents `
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
      return message.channel.send(embed);
    } else {
      if(option.match("set")) {
        if(!message.member.hasPermission(`MANAGE_GUILD`) && message.author.id !== "292936070603997185") return message.channel.send(`You need permission to manage server to use this command`)
        let channel = message.mentions.channels.first()

        db.set(`loggingchnl_${message.guild.id}`, channel.id);

        const embed2 = new MessageEmbed()
        .setColor(`RANDOM`)
        .setDescription(stripIndents `
        Logging channel has been set to: ${channel}
        `)
        .setTimestamp()
        .setFooter(`Logging channel`, message.guild.iconURL)
      return message.channel.send(embed2)
      } else {
    if(option.match("on")) {
      if(!message.member.hasPermission(`MANAGE_GUILD`) && message.author.id !== "292936070603997185") return message.channel.send(`You need permission to manage server to use this command`)
      db.set(`logging_${message.guild.id}`, "on")
      const embed3 = new MessageEmbed()
      .setDescription(stripIndents `
      Logging has been set to **ON**
      `)
      .setTimestamp()
      .setFooter(`Logging enabled`, message.guild.iconURL)
      .setColor("RANDOM")
      return message.channel.send(embed3);
    } else if(option.match("off")) {
      if(!message.member.hasPermission(`MANAGE_GUILD`) && message.author.id !== "292936070603997185") return message.channel.send(`You need permission to manage server to use this command`)
      db.set(`logging_${message.guild.id}`, "off")
      const embed = new MessageEmbed()
      .setDescription(stripIndents `
      Logging has been set to **OFF**
      `)
      .setTimestamp()
      .setFooter(`Logging disabled`, message.guild.iconURL)
      return message.channel.send(embed)
    }
  }
}

}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: 'logging', 
  description: 'Set the logging to the channel like \`Message Edited\`, \`Message Deleted\` and more!', 
  usage: 'logging',
  perms: "MANAGE_GUILD"
}