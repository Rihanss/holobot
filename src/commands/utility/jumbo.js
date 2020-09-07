const { Util, MessageEmbed } = require('discord.js');
const snek = require('snekfetch');
const fs = require('fs');

exports.run = async(client, message, args) => {
   // try {
      const embed = new MessageEmbed()
      .setColor('GREEN')
      
      const emote = Util.parseEmoji(args[0]);
      if (emote.animated === true) {
        const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`;
        const { body: buffer } = await snek.get(`${URL}`);
        embed.setImage(URL)
        message.channel.send(embed)
      } else {
        const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`;
        const { body: buffer } = await snek.get(`${URL}`);
        embed.setImage(URL)
        message.channel.send(embed)
        
      }
  //  } catch (error) {
  //    if (error.message === 'TypeError: Cannot read property \'1\' of null') {
   //     message.reply('Give me an actual emote.');
   //   }
    }
 // }
exports.conf = {
  aliases: ["j"],
  cooldown: "3"
};

exports.help = {
    name: 'jumbo',
    usage: 'jumbo <emoji>',
    description: 'Enlarges emojis!'
};