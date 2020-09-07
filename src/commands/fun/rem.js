const { get } = require('node-superfetch');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix) => {

  const { body } = await get("https://rra.ram.moe/i/r?type=rem");

  let embed = new MessageEmbed() 
  .setColor(color) 
  .setTitle(`**Rem**`)
  .setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
  .setFooter(`Request by: ${message.author.tag} | Powered by Weeb.sh`, message.author.displayAvatarURL) 
  message.channel.send(embed);
  
}

exports.conf = {
    aliases: [],
    cooldown: ""
}

exports.help = {
    name: "rem",
    description: "give a random rem pictures",
    usage: "rem"
}
