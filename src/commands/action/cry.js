const { get } = require("node-superfetch")
const { MessageEmbed } = require("discord.js")

exports.run = async(client, message, args) => {

  try {
    const { body } = await get("https://rra.ram.moe/i/r?type=cry");
    
    let embed = new MessageEmbed()
    .setTitle(`**Cry 😭**`)
    .setColor("RANDOM")
    .setDescription(`
    **${message.author.username}** is crying...
    `)
    .setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
    message.channel.send(embed);

  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
    console.error(e.message)
  }
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "cry",
  description: "We do need to cry? Eh, express it...",
  usage: "cry"
}