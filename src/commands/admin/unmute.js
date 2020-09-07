const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const ms = require("ms");

exports.run = async(client, message, args, color, perms) => {
  try {
    if(!message.member.hasPermission("MANAGE_ROLES")) return args.missing(message, "You don't have enough permission to do this [Manage Roles]", client.commands.get("unmute").help);
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) return message.channel.send(`Couldn't find the user`);
    let muterole = message.guild.roles.find(x => x.name === "Muted");

    await (user.roles.remove(muterole.id));
    const embed = new MessageEmbed()
    .setTitle(`**Server Unmute**`)
    .setDescription(stripIndents `
    You has been unmuted from the server **${messsage.guild.name}**
    `)
    .setColor(`RANDOM`)
    user.send(embed);
    message.channel.send(`${user} has been unmuted from the server!`);

  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
  }
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "unmute",
  description: "Unmute a user",
  usage: "unmute <@user>",
  perms: "MANAGE_ROLES"
}