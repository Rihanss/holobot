const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

exports.run = async(client, message, args) => {
  try {
  if(!message.member.hasPermission(`MANAGE_EMOJIS`)) return message.channel.send(`You need \`Manage Emojis\` permission to do this command.`)
  let image = message.attachment.first();
  let title = args.join(" ");
  if(!image) return message.channel.send(`No image provided`);
  if(!title) return message.channel.send(`Please insert a title for the emoji!`);

message.guild.createEmoji(image.url, title).then(s => {
  let embed = new MessageEmbed()
  .setTitle(`**Emoji created**`)
  .setDescription(stripIndents `
  **Design:** ${s}
  **Name:** ${title}
  **Preview:**
  `)
  .setImage(image.url)
  message.channel.send(embed)
})
  
}catch(e) {
    message.channel.send(`error has been occured\n${e.message}`)
  }
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "emoji",
  description: "Create emoji for the server via bot commands",
  usage: "emoji <image> <title>",
  perms: "MANAGE_EMOJIS"
}
