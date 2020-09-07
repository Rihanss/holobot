const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You need \`KICK_MEMBERS\` permission to Kick members.`);
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.channel.send(`You need \`KICK_MEMBERS\` permission to Kick members.`);
  try {
    let kickedUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if(!kickedUser) return args.missing(message, "Please mention orgive a id of user you want to kick");
    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason provided."

    const kickDMEmbed = new MessageEmbed()
    .setTitle(`**Server Kick**`)
    .setColor("DARK_RED")
    .setDescription(stripIndents`
    You has been kicked from **\`${message.guild.name}\`**

    **Reason ≽** ${reason || `N/A`}
    **Moderator ≽** ${message.author.tag}
    `)

    const kickEmbed = new MessageEmbed()
    .setTitle(`**Server Kick**`)
    .setColor(`DARK_RED`)
    .setDescription(stripIndents`
    **\`${kickedUser.user.username}\`** was kicked from **\`${message.guild.name}\`**

    **Reason ≽** ${reason || `N/A`}
    **Moderator ≽** ${message.author.tag}
    `)
    message.channel.send(kickEmbed);
    kickedUser.send(kickDMEmbed);
    kickedUser.kick(reason);
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`);
  }
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "kick",
  description: "Kicks a member from the server",
  usage: "kick <@user> [reason]",
  perms: "KICK_MEMBERS"
}