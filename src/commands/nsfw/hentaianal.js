const { get } = require('node-superfetch');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix) => {
  
  let nsfw = require('../../assets/json/nsfwAns.json');

let nsfwAns = nsfw[Math.floor(Math.random() * nsfw.length)]
  
  if(!message.channel.nsfw) return message.channel.send(`🚫 | **${message.author.username}**, ${nsfwAns}`)
  
  try {
  const { body } = await get('https://nekobot.xyz/api/image?type=hentai_anal') 
  
  let embed = new MessageEmbed() 
  .setColor(color)
  .setDescription(`**[Click here if image failed to load](${body.message})**`) 
  .setImage(body.message)
  .setFooter(`Request by: ${message.author.tag} | ${client.user.username} v${client.version}`) 
  message.channel.send(embed);
  } catch (e) {
    message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later!`) 
  } 

}

exports.conf = {
    aliases: ['analhentai'],
    cooldown: "3"
}

exports.help = {
    name: "hentaianal",
    description: "Search for hentai anal image",
    usage: "hentaianal"
}
