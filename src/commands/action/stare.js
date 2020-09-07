const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');
const { stripIndents } = require("common-tags");

exports.run = async(client, message, args) => {
    try {
    const user = message.mentions.users.first() || message.author;

    const { body } = await get("https://rra.ram.moe/i/r?type=stare");

    if(user.id === message.author.id) {
    let embed = new MessageEmbed()
    .setColor(`RANDOM`)
    .setDescription(stripIndents `
    **${client.user.username}** stares at **${user.username}**
    `)
    .setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
    message.channel.send(embed)
    } else {
    let embed = new MessageEmbed()
    .setColor(`RANDOM`)
    .setDescription(stripIndents `
    **${message.author.username}** stares at **${user.username}**
    `)
    .setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
    message.channel.send(embed)
    }
}catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
}
}

exports.conf = {
    aliases: [],
    cooldown: "3"
}

exports.help = {
    name: "stare",
    description: "Stare at someone!!!",
    usage: "stare <@user>"
}