const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");

exports.run = async(client, message, args) => {
  try {
    const { body } = await get("https://nekobot.xyz/api/image?type=holo");

    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`**Holo Image**`)
    .setImage(body.message)
    .setFooter(`Request by: ${message.author.tag} | ${client.user.username} v${client.version}`)
    message.channel.send(embed);
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`);
  };
};

exports.conf = {
    aliases: [],
    cooldown: "3"
}

exports.help = {
    name: "holo",
    description: "Search for holo image",
    usage: "holo"
}
