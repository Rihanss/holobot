const { MessageEmbed } = require("discord.js");
const { get } = require('node-superfetch');

exports.run = async (client, message, args, color, prefix) => {
try {
  const { body } = await get("https://rra.ram.moe/i/r?type=owo");

  let embed = new MessageEmbed() 
  .setColor(color) 
  .setDescription(`**[Click here if the image failed to load.](https://cdn.ram.moe/${body.path.replace("/i/", "")})**`) 
  .setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
  .setFooter(`Request by: ${message.author.tag} | Powered by Weeb.sh`, message.author.displayAvatarURL) 
  message.channel.send(embed);

}catch(e) {
  message.channel.send(`Error has been occured\n\`${e.message}\``);
}
}

exports.conf = {
    aliases: ['uwu', 'UwU', 'OwO'],
    cooldown: "1"
}

exports.help = {
    name: "owo",
    description: "OwO, what's this?",
    usage: "owo"
}
