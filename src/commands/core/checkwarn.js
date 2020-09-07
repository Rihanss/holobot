const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
  try {
    let user = message.mentions.users.first() || message.author;
    if(!user) return args.missing(message, `You need to mention a user to check warns!`);
    if(user.bot) return message.channel.send(`You cannot check warnings on a bot`);

    let warnings = await db.fetch(`warn_${message.guild.id}-${user.id}`);
    let warnCount = await db.fetch(`warnCount_${message.guild.id}-${user.id}`);
    if(!warnings) return message.channel.send(`**${user.username}** doesn't have any warnings in **${message.guild.name}**\n\n*Warnings only apply to the current server, not global*`)

    let username = warnings.username
    let reason = warnings.reason
    let guild = warnings.guild
    let warnedby = warnings.warnedby

    const embed = new MessageEmbed()
    .setTitle(`**Server Warns**`)
    .setDescription(stripIndents `
    **\`${warnings.username}\` warns in \`${warnings.guild}\`**

    **Reason ≽** ${reason || "No reason provided"}
    **Warned By ≽** ${warnedby}
    **Total Warn ≽** ${warnCount || "0"}
    `)
    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setColor(`RANDOM`)
    .setFooter(`Your warns ONLY apply to this server`)
    message.channel.send(embed);

  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`);
  }

}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "checkwarn",
  description: "Check how many users got warned in current server",
  usage: "checkwarn <@user>"
}