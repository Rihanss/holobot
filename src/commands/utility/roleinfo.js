const { MessageEmbed } = require("discord.js");
const moment = require("moment")
const { bot_prefix } = require('../../config.json');
module.exports.run = async (client, message, args) => {
  let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);

    if (!role) role = message.member.highestRole;

     let sicon = message.guild.iconURL;

  let roleedit = role.editable.toString();
      let rolemanageable = role.editable.toString();

    if(roleedit === false) roleedit = "Not Editable"
    if(roleedit === true) roleedit = "Yes"
    
    if(rolemanageable === false) rolemanageable = "Not Manageable"
    if(rolemanageable === true) rolemanageable = "Yes"

    const embed = new MessageEmbed()
        .setColor(role.hexColor)
        .setTitle(`**Role Info**`)
        .setDescription(`**${role.name}**\n\n**ID »** ${role.id}\n**Hex Color »** ${role.hexColor}\n**Users »** ${role.members.size}\n**Created »** ${moment.utc(role.createdAt).format('LLLL')}\n**Mentionable? »** ${role.mentionable ? '\nYes' : 'No'}\n**Editable? »** ${roleedit ? "Yes" : "No"}\n**Manageable? »** ${rolemanageable ? "Yes" : "No"}\n**Hoisted? »** ${role.hoist ? "Yes" : "No"}`)
        .setThumbnail(`${message.guild.iconURL}?size=2048`)
    .setFooter(`Note: Role names are Case Sensitive. | Copy Role ID for Accurate Role Info.`)
    return message.channel.send({
        embed: embed
    });
};

exports.conf = {
  aliases: ['rinfo'],
  cooldown: 4
};

exports.help = {
  name: 'roleinfo',
  description: 'Show information for a role',
  usage: 'roleinfo <rolename>'
};