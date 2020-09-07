const { MessageEmbed } = require("discord.js");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBLTOKEN);

exports.run = async(client, message, args) => {
  try {
    dbl.hasVoted(message.author.id).then(voted => {
      if(!voted) {
        let embed = new MessageEmbed()
        .setTitle(`**Vote Holo!**`)
        .setThumbnail(`https://i.imgur.com/EIUqMAf.png`)
        .setDescription(`*You may need to wait 1 minute for Vote to process.*`)
        .setColor('#7289DA')
        .setURL(`https://discordbots.org/bot/519521318719324181/vote`)
        message.channel.send(embed);
      } else {
        return message.channel.send(`*You already given me Upvote. Thanks!*, come back again in 12 hours to vote again.`);
      }
    })
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
  } 
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "vote",
  description: 'Vote Holo on Top.GG! Cmon, better do it!!',
  usage: 'vote'
}