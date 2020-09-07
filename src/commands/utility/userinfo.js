const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const moment = require("moment");

exports.run = async(client, message, params, args, func) => {
  try {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) user = message.author;
    const member = message.guild.member(user);
    let status = {
      "online": "Online ✅",
      "idle": "Idle 🌙",
      "dnd": "Do not Disturb ⛔️",
      "offline": "Invisible ⚫️"
    };
    let bot = {
      "true": "Yes",
      "false": "No"
    };

    let embed = new MessageEmbed()
    .setColor(0x76d6ff)
    .setThumbnail(user.avatarURL)
    .setTitle(`**${user.username}'s User Info**`)
    .setDescription(stripIndents `
    👤 __**Basic Account Info**__
    
    **ID »** ${user.id}
    **Discrim » #**${user.discriminator}
    **Bot? » **${bot[user.bot]}
    **Account Created »** ${moment.utc(user.createdAt).format('LLLL')}
    **Current Status »** ${status[user.presence.status]}
    **Current Game »** ${user.presence.game ? user.presence.game.name : 'Not Playing/Streaming'}
    
    📇 __**Member Info**__
    **Nickname »** ${member.nickname !== null ? `${member.nickname}` : 'No Nickname Set'}
    **Joined Guild »** ${moment.utc(member.joinedAt).format('LLLL')}
    
    **Server Role(s) | \`${member.roles.cache.size}\`**
    ${member.roles.cache.map(roles => `**${roles}**`).join(' ')}`)

return message.channel.send(embed)

  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``)
  }
}
/*const Discord = require("discord.js")
const moment = require("moment")

exports.run = (client, message, params, args, func) => {
  
  let user = message.mentions.users.first() || client.users.get(args[0])
  if (!user) user = message.author

  const member = message.guild.member(user);
  
    let status = {
          "online": "Online ✅",
           "idle": "Idle 🌙",
           "dnd": "Do not Disturb ⛔️",
          "offline": "Invisible ⚫️"
            };
  
    let bot = {
            "true": "Yes",
            "false": "No"
            };


    let embed = new Discord.RichEmbed()
		
        .setColor(0x76d6ff)
        .setThumbnail(user.avatarURL)
        .setTitle(`**${user.username}'s User Info**`)
        .setDescription(`👤 __**Basic Account Info**__\n**ID »** ${user.id}\n**Discrim » #**${user.discriminator}\n**Bot? » **${bot[user.bot]}\n**Account Created »** ${moment.utc(user.createdAt).format('LLLL')}\n**Current Status »** ${status[user.presence.status]}\n**Current Game »** ${user.presence.game ? user.presence.game.name : 'Not Playing/Streaming'}\n\n📇 __**Member Info**__\n**Nickname »** ${member.nickname !== null ? `${member.nickname}` : 'No Nickname Set'}\n**Joined Guild »** ${moment.utc(member.joinedAt).format('LLLL')}\n\n**Server Role(s) | \`${member.roles.size}\`**\n${member.roles.map(roles => `**${roles}**`).join(' ')}`)
    
  return message.channel.send(embed)

    } */

exports.conf = {
  aliases: [],
  cooldown: "3"
};

exports.help = {
  name: 'userinfo',
  description: 'Check info of mentioned user!',
  usage: 'userinfo [mention]'
};
