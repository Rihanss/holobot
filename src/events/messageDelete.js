const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

module.exports = async(client, message) => {
try {

  if(message.author.bot) return;
  if(message.content.length > 1024) return;

  let embed = new MessageEmbed()
  .setAuthor(`${message.author.tag} | Deleted message`, message.author.displayAvatarURL)
  .setDescription(stripIndents `
**Message sent by ${message.author} deleted in ${message.channel.toString()}**

**Message Content:**\n\n${message.content}
`)
  .setFooter(`ID: ${message.id}`) 
  .setColor("RANDOM").setTimestamp()

  let on = await db.fetch(`logging_${message.guild.id}`);
  if(on === null) return;
  if(on === 'off') return;
  if(on === 'on') {
  let channel = await db.fetch(`loggingchnl_${message.guild.id}`)
  let chnl = message.guild.channels.cache.get(channel)
  if(!channel) return undefined;
  chnl.send(embed);
  };
} catch (e) {
  if (e.message === "Cannot read property 'bot' of null") return;
}
};