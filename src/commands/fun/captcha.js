const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");

exports.run = async(client, message, args) => {
  try {
    const user = message.mentions.users.first() || message.author;
    const { body } = await get(`https://nekobot.xyz/api/imagegen?type=captcha&url=${user.displayAvatarURL}&username=${user.username}`);
    
    const embed = new MessageEmbed()
    .setImage(body.message)
    .setColor(`RANDOM`)
    message.channel.send(embed);
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``)
  }
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "captcha",
  description: "Generate Captcha",
  usage: "captcha [@user]"
}