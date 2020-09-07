const { MessageEmbed } = require('discord.js')

exports.run = async(client, message, args) => {
  const user = message.mentions.users.first() || message.author;
  const embed = new MessageEmbed()
  .setTitle(`${user.tag} Avatar`)
  .setImage(user.displayAvatarURL({dynamic: true, size: 2048}))
  .setColor(`GREEN`)
  message.channel.send(embed)
  
  
  
}

exports.conf = {
  aliases: [],
  cooldown: 1
};

exports.help = {
  name: "avatar",
  description: "Show your avatar",
  usage: "avatar",
};