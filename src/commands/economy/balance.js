const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
  try {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) user = message.author;
    if(user.bot) return;
    let apples = await db.get(`currency_${user.id}`)

    if(apples === null) apples = 0;
    const embed = new MessageEmbed()
    .setTitle(`**🍎 Apples**`)
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setDescription(stripIndents `**${user.username}** has 🍎\`${apples}\` Apples in pocket dimension.`)
    .setColor(`#efc381`)
    .setFooter(`Buy special stuff with z-store | z-leaderboard apples`)
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
  name: "balance",
  description: "Get your or someone balance [Apple]",
  usage: "balance [@mention|ID]"
}