const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");

exports.run = async(client, message, args) => {
  try {
    const { body } = await get("https://nekobot.xyz/api/image?type=kemonomimi");

    const embed = new MessageEmbed()
    .setTitle(`**Kemonomimi**`)
    .setColor(`GREEN`)
    .setImage(body.message)
    .setFooter(`Requested by: ${message.author.tag} | ${client.user.username} v${client.version}`)
    message.channel.send(embed);
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``);
  };
};

exports.conf = {
    aliases: ['knmm'],
    cooldown: "5"
};

exports.help = {
    name: "kemonomimi",
    description: "Search for kemonomimi image",
    usage: "kemonomimi"
};
