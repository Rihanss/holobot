const { MessageEmbed } = require("discord.js");
const moment = require("moment")
const { bot_prefix } = require('../../config.json');
module.exports.run = async (client, message, args) => {
  
  try {
    
  let emoji = message.guild.emojis.get(args[0]) || message.guild.emojis.find(emoji => emoji.name === args.join(" "))
  
   if (args[0].charCodeAt(0) >= 55296) return message.channel.send(`**NateBot |** ${args[0]} ${args.charCodeAt(0)} is a Normal Discord System Emoji.\n\nThis emoji is from **Twemojii -<https://twemoji.twitter.com>**`);

  if(!emoji) return message.channel.send("**NateBot |** **This Emoji doesn't exist!**\n*Make sure you type the correct Emoji Name or ID.*\n\n**Examples: \`n!emojiinfo natebot\`** - **\`n!emojiinfo 602862385702764545\`**\n**You can get Emoji ID by typing \`\\:emojiname:\`**")
    
  if(emoji.animated === false) emoji.animated = "No"
  if(emoji.animated === true) emoji.animated = "Yes"

  let embed = new MessageEmbed()
  .setTitle("**Emoji Info**")
  .setDescription(`**${emoji.name}**\n\n**ID »** ${emoji.id}\n**Identifier »** :${emoji.identifier}\n**Emoji From »** ${emoji.guild}\n**Created »** ${moment.utc(emoji.createdAt).format('LLLL')}\n**Animated? »** ${emoji.animated}\n**Emote URL »** [**Click here**](${emoji.url})`)
  .setColor(`#76d6ff`)
  .setThumbnail(emoji.url)
  .setFooter(`${message.guild.name} | ${message.guild.id}`, `${message.guild.iconURL}?size=2048`)

  message.channel.send(embed)

  } catch (e){
        if (e.message === "Cannot read property 'charCodeAt' of undefined")
        return message.channel.send(`**NateBot |** You must specify the Name or ID of an Emoji!\n\n**Examples: \`n!emojiinfo natebot\`** - **\`n!emojiinfo 602862385702764545\`**\n**You can get Emoji ID by typing \`\\:emojiname:\`**`)

  }
}
exports.conf = {
  aliases: ['einfo'],
  cooldown: 4
};

exports.help = {
  name: 'emojiinfo',
  description: 'Show information for a Emote',
  usage: 'emojiinfo <emojiname>'
};