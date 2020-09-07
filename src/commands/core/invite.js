const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags")

exports.run = async (client, message, args, color, prefix) => {
  let embed = new MessageEmbed() 
  .setColor(color)
  .setTitle(`**Holo**`)
  .setDescription(stripIndents `
Here are some useful links for you to check out!

🖥 **[Holo Website](https://holo-bot.glitch.me) »** Official Website for Holo

➡️ **[Invite Bot](https://discordapp.com/api/oauth2/authorize?client_id=519521318719324181&permissions=3534055&scope=bot)**

📚 **[Support Server](https://discordapp.com/invite/G2rb53z) »** Help and Support

📚 **[Holo Lounge](https://discord.gg/4BKmt9G) »** Official Community Server

`)
  .setFooter(`For the About Info of Holo, run z-about`)
  .setThumbnail(`https://i.imgur.com/AwXGrbU.png`)
  message.channel.send(embed);
}

exports.conf = {
    aliases: [],
    cooldown: "5"
}

exports.help = {
    name: "invite",
    description: "Useful Links for Holo",
    usage: "invite"
}
