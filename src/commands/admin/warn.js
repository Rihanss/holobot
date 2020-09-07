const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args, perms) => {
  try {
    if(!message.member.hasPermission("MANAGE_GUILD")) return perms.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("warn").help);
    const user = message.mentions.users.first();
    const reason = args[1];

    if(!user) return args.missing(message, "You need to mention user you want to warn", client.commands.get("warn").help);
    if(!reason) return args.missing(message, "Please specify a reason you want to warn!", client.commands.get("warn").help);
    if(user.id === message.author.id) return message.channel.send(`You cannot warn yourself.`);
    if(user.bot) return message.channel.send(`You cannot warn a bot!`);

    const data = await db.fetch(`warn_${user.id}`)
    let totalwarns = 1;

    db.set(`warn_${user.id}`, { username: user.username, reason: reason, guild: message.guild.name, warnedby: message.author.username });
    db.add(`warnCount_${message.guild.id}-${user.id}`, totalwarns)

    const embed = new MessageEmbed()
    .setTitle(`**Server Warn**`)
    .setDescription(stripIndents `
    **${user.username}** has been warned

    **Reason ≽** ${reason}
    **Warned by ≽** ${message.author.username}
    **Total warns ≽** ${totalwarns}
    `)
    .setColor(`RED`)
    message.channel.send(embed);

    const privEmbed = new MessageEmbed()
    .setTitle(`**Server Warn**`)
    .setDescription(stripIndents `
    You has been warned by ${message.author.username}

    **Reason ≽** ${reason}
    **Warned By ≽** ${message.author.username}
    **Total warns ≽** ${totalwarns}
    `)
    .setColor(`RANDOM`)
    user.send(privEmbed)

  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
  }
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "warn",
  description: "Warn user",
  usage: "warn <@user>",
  perms: "MANAGE_GUILD"
}