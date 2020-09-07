const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");

exports.run = async(client, message, args) => {
    try {
    const { body } =  await get("https://rra.ram.moe/i/r?type=smug");

    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`**Smug**`)
    .setDescription(stripIndents `
    **${message.author.username}** expresses the smug...
    `)
    .setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
      message.channel.send(embed)

    }catch(e) {
      message.channel.send(`Error has been occurred\n${e.message}`);
    }

}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "smug",
  description: "smug, yes. go ahead..",
  usage: "smug"
}
