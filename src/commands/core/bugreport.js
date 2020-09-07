const { post } = require("node-superfetch");
const { MessageEmbed } = require("discord.js");

exports.run = async(client, message, args, perms) => {
  try {
    function clean(text) {
      if(typeof(text) === "string")
      return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
      else
        return text;
    }
    const bug = args.join(" ");
    if (!bug) return message.channel.send({ embed: { color: 0xf91d1d, description: 'Please specify a bug!'}})
  const embed = new MessageEmbed()
  .setAuthor(`Server: ${message.guild.name} (${message.guild.id})`, message.guild.iconURL)
  .setDescription(`
**${message.author.tag}** (${message.author.id})

Bug:

${bug}
`)
  .setColor(`GREEN`)
    const id = '554993231142584332';
    new Promise((resolve, reject) => {
      post(`https://discordapp.com/api/channels/${id}/messages`)
        .set('Authorization', `Bot ${client.token}`).send({ embed })
        .end((err, res) => {
          if (err) {
            reject(err);
            message.reply(`There was an error while sending your bug report to ${client.user.username} Support. Please try again later.`);
          } else {
            resolve(res);
            message.channel.send(`✅ **${message.author.username}**, your bug report has successfully been submitted to ${client.user.username} Support for review. Thank you!.`);
          }
        });
    });
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`);
  }
}

exports.conf = {
  aliases: ["bug"],
  cooldown: "10"
}

exports.help = {
  name: "bugreport",
  description: "Report the bug you found from the bot",
  usage: "bugreport <bugcpntent>"
}