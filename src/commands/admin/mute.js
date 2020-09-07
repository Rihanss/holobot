const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const ms = require("ms");

exports.run = async(client, message, args, perms) => {
    try {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`You need permission of MANAGE_ROLES to use it`)
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) return message.channel.send(`Please mention or give id to mute user`);
    let reason = args.slice(1).join(" ");
    if(!reason) return message.channel.send(`Please specify a reason for the mute`);
    let muterole = message.guild.roles.find(x => x.name === "Muted");
    
    if(!muterole) {
        try {
            muterole = await message.guild.roles.create({
                name: "Muted",
                color: "#bcbcbc",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.createOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            })
        }catch(e) {
            message.channel.send(`Error has been occured\n${e.message}`)
        }
    }

    await (user.roles.add(muterole.id));

    // to user dm
    const embed = new MessageEmbed()
    .setTitle(`**Server mute**`)
    .setDescription(stripIndents `
    You have been muted from **${message.guild.name}**

    **Reason ≽** ${reason || "No reason provided"}
    **Muted by ≽** ${message.author.tag}

    `)
    .setColor(`RED`)
    .setFooter(`Is this a mistake mute? Contact the one that muted you.`)
    user.send(embed)

    // to current channel
    const nowEmbed = new MessageEmbed()
    .setTitle(`**Server Mute**`)
    .setDescription(stripIndents `
    **${message.author.tag}** has been muted
    
    **Reason ≽** ${reason || `N/A`}
    **Muted by ≽** ${message.author.tag}
    `)
    .setColor(`RED`)
    message.channel.send(nowEmbed);    
    }catch(e) {
        message.channel.send(`Error has been occured\n${e.message}`)
    }
}

exports.conf = {
    aliases: [],
    cooldown: "3"
};

exports.help = {
  name: 'mute',
  description: 'Mutes a user.\nIf there is no Mute Role, Holo will create one automatically.',
  usage: 'mute <user> [reason]',
  perms: "MANAGE_CHANNELS"
}