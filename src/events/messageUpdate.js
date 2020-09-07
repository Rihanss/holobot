const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = async(client, oldMessage, newMessage) => {
  try {
  if(oldMessage.author.bot) return;
  if(newMessage.content.length > 1024) return;
  if(oldMessage.content.length > 1024) return;

  if(oldMessage.content === newMessage.content) return;

  let embed = new MessageEmbed()
  .setAuthor(`${newMessage.author.tag} | Edited message`, newMessage.author.displayAvatarURL({dynamic: true}))
  .setDescription(`**Message sent by ${newMessage.author} edited in ${oldMessage.channel.toString()}**`) 
  .addField("Before Edited:", `${oldMessage.content}` || "No content")
  .addField("Edited To:", `${newMessage.content}` || "No content")
  .addField("Link to message:", newMessage.url || newMessage.link || 'No URL') 
  .setFooter(`ID: ${newMessage.id}`) 
  .setColor("RANDOM")
  .setTimestamp()

  let on = await db.fetch(`logging_${oldMessage.guild.id}`);
  if(on === null) return;
  if(on === 'off') return;
  if(on === 'on') {
    let channel = await db.fetch(`loggingchnl_${oldMessage.guild.id}`);
    let chnl = oldMessage.guild.channels.cache.get(channel);
    if(!channel) return;
    chnl.send(embed);
  }
}catch(e) {
  if(e.message === "Cannot read property 'bot' of null") return;

}
};