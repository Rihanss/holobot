const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

exports.run = async(client, message, args) => {
  try {
  let nick = args.slice(0).join(" ");
  let len = 20;
  if(!nick) return args.missing(message, "You need to specify a nickname", client.commands.get("setnickname").help);
  if(nick.length > len) return message.channel.send(`That's a long nickanme. Please make it shorter. Max 20 Characters`);
  db.set(`nickname_${message.author.id}`, `${nick}`);

  const embed = new MessageEmbed()
  .setTitle(`**Nickname**`)
  .setFooter(`Successfully Set! | Run z-profile to view your new Nickname`)
  .setColor(`GREEN`)
  message.channel.send(embed);
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``);
  };
};

exports.conf = {
  aliases: ["setnick"],
  cooldown: "5"
};

exports.help = {
  name: "setnickname",
  description: "Set your nickname on profile command",
  usage: "setnickname <nick>"
};