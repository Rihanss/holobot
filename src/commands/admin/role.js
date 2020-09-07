const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

exports.run = async(client, message, args, color, perms) => {
  try {
    if(!message.member.hasPermission(`MANAGE_ROLES`)) return args.missing(message, "You don't have enough permission to do this [Manage Roles]", client.commands.get("role").help);
    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(`I don't have permission to manage roles.`);
    let user = message.guild.member(message.mentions.users.first());
    if(!user) return message.channel.send(`You must mention a user you want to give/remove roles to!`);
    let role = args.slice(1).join(" ")
    if(!role) return message.channel.send(`You'll need to specify a Role Name!`)
    let grole = message.guild.roles.find(x => x.name === `${role}`);
    if(!grole) return message.channel.send(`**Role does not exist**\n*Make sure you typed the correct role name*`)

    if(user.roles.has(grole.id)) {
      user.roles.remove(grole.id)
      message.channel.send(`❌ **Role Removed from \`${user.user.username}\`**\n**Role Name:** ${role}`)
    } else {
      if(!user.roles.has(grole.id)) {
        user.roles.add(grole.id)
        message.channel.send(`✅ **Role Added to \`${user.user.username}\`**\n**Role Name:** ${role}`)
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
  name: "role",
  description: "Add/Remove a role to the user",
  usage: "role <role>",
  perms: "MANAGE_ROLES"
}