const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");
const ms = require("ms");

exports.run = async(client, message, args, perms) => {
  try {
    if(!message.member.hasPermission(`MANAGE_ROLES`)) return args.missing(message, "You don't have enough permission to do this [Manage Roles]", client.commands.get("tempmute").help);
    if(!message.guild.member(client.user).hasPermission(`MANAGE_ROLES`)) return perms.missing(message, "I don't have enough permission to perform this command", client.commands.get("tempmute").help);
    let time = args[0]
    if(!time) time = "6h"
    let member = message.mentions.users.first()
    if(!member) return message.channel.send(`Cannot find the user you mentioned. Please specify a member you want to mute in this server`);
    let reason = args[2]
    let mutedrole = message.guild.roles.find(x => x.name === "Muted")
    let muterole = await db.fetch(`mutedrole_${message.guild.id}`)
    if(muterole === null) muterole = mutedrole
    else mutedrole = muterole
    if (!muterole) return message.channel.send(`Can't seem to find a **Muted** Role!\nDo you have one? if so, please assign it by doing \`z-settings muterole set <role>\``)
    if (member.roles.has(muterole.id)) return message.channel.send(`**${member.user.username}** is already temporarily muted.`)
    await (member.roles.add(muterole.id));

    const embed = new MessageEmbed()
    .setTitle(`**Server Temporary Mute**`)
    .setDescription(stripIndents `
    You has been temporary muted from **${message.guild.id}**

    **Reason ≽** ${reason || "No Reason"}
    **Muted by ≽** ${message.author.tag}
    **Duration ≽** ${time}
    `)
    .setColor(`RANDOM`)
   member.send(embed);

   const muteembed = new MessageEmbed()
   .setTitle(`**Server Temporary Mute**`)
   .setDescription(stripIndents `
    ${member.user.username} was temporarily muted from the Server: **\`${message.guild.name}\`**

    **Reason ≽** ${reason || `No Reason`}
    **Moderator ≽** ${message.author.tag}
    **Duration ≽** ${time}
    `)
       message.channel.send(muteembed)
   setTimeout(function() {
    member.removeRole(muterole.id);
}, ms(time));
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
  }

}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "tempmute",
  description: "Temporarily mute someone for specifc amount of time",
  usage: "tempmute <time> <user> [reason]",
  perms: "MANAGE_ROLES"
}