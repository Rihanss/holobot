const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");

exports.run = async(client, message, args) => {
  try {
    const { body } = await get(`https://apis.duncte123.me/meme`)

    const embed = new MessageEmbed()
    .setTitle(body.data.title)
    .setURL(body.data.url)
    .setImage(body.data.image)
    .setColor(`RANDOM`)
    .setTimestamp()
    message.channel.send(embed);
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``);
  };
};

exports.conf = {
    aliases: [],
    cooldown: "5"
}

exports.help = {
    name: "meme",
    description: "Get a random meme",
    usage: "meme"
}
