const { MessageEmbed } = require('discord.js')
const cooldown = new Set()

exports.run = async (client, message, args) => {
       let emojis = message.guild.emojis.map(x => `${x}`).join('') || 'No Emojis'
      let index = 0;
        let emojisemb = new MessageEmbed()
        .setTitle(`${message.guild.name} Emojis`)
        .setDescription(`${emojis}`)
        .setColor('GREEN')
        message.channel.send(emojisemb);
}
exports.conf = {
  aliases: ['emojis'],
  cooldown: 5
};

exports.help = {
  name: "emojilist",
  description: "Check server emojis",
  usage: "emojilist"
};
