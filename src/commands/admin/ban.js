const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You need \`Ban Members\` permission to ban members.`);
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(`I need Permission \`Ban Members\` to ban Members`);

  try {
    let banMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if(!banMember) return args.missing(message, "You need to mention or give ID to ban", client.commands.get("ban").help);
    if(banMember.id === message.author.id) return message.channel.send(`❌ | You cannot ban yourself`); 

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason provided.";

    const banDMEmbed = new MessageEmbed()
      .setTitle(`**Server Ban**`)
      .setColor("RED")
      .setThumbnail(banMember.user.displayAvatarURL({dynamic: true, size: 2048}))
      .setDescription(stripIndents`
      You has been banned from \`${message.guild.name}\`

      **Reason ≽** ${reason || `N/A`}
      **Moderator ≽** ${message.author.tag}
      `)

      const banEmbed = new MessageEmbed()
      .setTitle(`**Server Ban**`)
      .setColor(`DARK_RED`)
      .setThumbnail(banMember.user.displayAvatarURL({dynamic: true, size: 2048}))
      .setDescription(stripIndents`
      **\`${banMember.user.username}\`** was banned from **\`${message.guild.name}\`**
      
      **Reason ≽** ${reason || `N/A`}
      **Moderator ≽** ${message.author.tag}
      `)

    banMember.ban({ days: 7, reason: reason });
    banMember.send(banDMEmbed);    
    message.channel.send(banEmbed);

  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``)
  }
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "ban",
  description: "Ban a member from the server",
  usage: "ban <@user | id> [reason]",
	perms: "BAN_MEMBERS"
}