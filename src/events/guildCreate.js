const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = async(client, guild) => {
  if(!guild.available) return;

  const channel = client.channels.cache.get("ChannelID");
  if(!channel) return;
  let textChannel = guild.channels.cache.filter(m => m.type == "text").size;
  let voiceChannels = guild.channels.cache.filter(i => i.type == "voice").size;
  
  const embed = new MessageEmbed()
  .setTitle(`**Joined a guild!**`)
  .setDescription(stripIndents `
  **Guild name ≽** \`${guild.name}\`
  **Guild ID ≽** \`${guild.id}\`
  **Channels ≽** ${guild.channels.cache.size} Channels
    - **Voice Channels ≽** \`${voiceChannels}\`
    - **Text Channels ≽** \`${textChannel}\` 
  **Members ≽** ${guild.memberCount} Users
    - **Humans ≽** \`${guild.memberCount - guild.members.cache.filter(m => m.user.bot).size}\`
    - **Bots ≽** \`${guild.members.cache.filter(m => m.user.bot).size}\`
  `)
  .setFooter(`Total Guild Now: ${client.guilds.cache.size}`)
  .setColor(`RANDOM`)
  .setTimestamp()
  channel.send(embed);
};