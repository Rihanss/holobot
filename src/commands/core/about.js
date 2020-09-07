const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

exports.run  = async(client, message, args) => {
  
  const embed = new MessageEmbed()
  .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 2048 }))
  .setTitle(`**Holo**`)
  .setDescription(stripIndents`
  A Multi-Purpose Discord Bot focusing on Moderation, Games, Economy etc. And named after Holo, a female diety and protagonist of Spice & Wolf.
  
  **[Holo Website](https://holo-bot.glitch.me) ≽** Official Website for Holo
  **[Holo Lounge](https://discord.gg/4BKmt9G) ≽** Official Community Server
  `)
    .setImage(`https://i.imgur.com/S0SQVUw.png`)
    .setColor(`#de8e55`)
    .setThumbnail(`https://i.imgur.com/AwXGrbU.png`)
    .setFooter(`Developed by Holo Development | Icon by toptier.waifu`)
    message.channel.send(embed)

}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "about",
  description: "Information about the bot",
  usage: "about"
}