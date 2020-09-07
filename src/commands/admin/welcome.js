const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args, prefix, color) => {
  try {
    if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id === "292936070603997185") return args.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("welcome").help);
    let option = args.join(" ")
    if(!option) {
      const embed = new MessageEmbed()
      .setTitle(`**Welcomer settings**`)
      .setColor(`RANDOM`)
      .setDescription(stripIndents `
      **How to use:**
      **»** ${prefix}welcome set \`#channel\`
      **»** ${prefix}welcome on
      **»** ${prefix}welcome off
      
      **First, run this command:**
      **»** ${prefix}welcome set \`#channel\`
      
      **After that, run:** 
      **»** ${prefix}welcome on
      **»** ${prefix}welcome off (To turn off welcomer)
      `)
      .setFooter(`Background on the Welcomer is changeable on ${prefix}settings`)
      .setTimestamp()
      message.channel.send(embed);
    } else {
      if(option.match("set")) {
        if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id === "292936070603997185") return args.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("welcome").help);        let channel = message.mentions.channels.first()
        db.set(`welcomechnl_${message.guild.id}`, channel.id)
          
        var embed2 = new MessageEmbed()
        .setColor(color)
        .setTitle('**Welcomer 👋🏻**')
        .setDescription(`Welcome channel was set to: ${channel}`)
        message.channel.send(embed2);
      }
        if(option.match("on")) {
          if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id === "292936070603997185") return args.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("welcome").help);            db.set(`welcome_${message.guild.id}`, "ON")
          db.set(`welcome_${message.guild.id}`, "on");  
          var embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('**Welcomer 👋🏻**')
            .setDescription(`Welcomer has been set to **ON**.`)
            
            message.channel.send(embed);
        }
        if(option.match("off")) {
          if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id === "292936070603997185") return args.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("welcome").help);          db.set(`welcome_${message.guild.id}`, "OFF");
          db.set(`welcome_${message.guild.id}`, "off");
          let embed = new MessageEmbed()
          .setColor('GREEN')
          .setTitle('**Welcomer 👋🏻**')
          .setDescription(`Welcomer has been set to **OFF**.`)
          message.channel.send(embed)
        } 
    }
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
  }
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "welcome",
  description: "Set the welcomer",
  usage: "welcome",
  perms: "MANAGE_GUILD"
}