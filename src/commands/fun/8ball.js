const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");

exports.run = async(client, message, args) => {
    try {
    let { body } = await get(`https://natebotapi.glitch.me/api/8ball`);
    let question = args.slice(0).join(" ");
    if(!args[0]) return message.channel.send("**8 Ball 🎱 |** Please specifiy a question!");

    const embed = new MessageEmbed()
    .setTitle(`**8 Ball 🎱**`)
    .setColor(`#7f7c7c`)
    .setDescription(stripIndents `**Question »** ${question}\n**Answer »** ${body.response}`)
    return message.channel.send(embed);
    }catch(e) {
        message.channel.send(`Error has been occured\n${e.message}`)
    };
};
exports.conf = {
    aliases: ['8b'],
    cooldown: '5'
}
exports.help = {
    name: "8ball",
    description: "Tell to the mighty 8 Ball about your fortune.",
    usage: '8ball <questions>'
}