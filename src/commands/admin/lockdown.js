const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const ms = require("ms");

exports.run = async(client, message, args, tools, perms) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You need \`Manage Channels\` permission to do this command.`)
    if(!message.guild.member(client.user).hasPermission(`MANAGE_CHANNELS`)) return message.channel.send(`I don't have permission to MANAGE CHANNELS, please give me the permission.`);
    if(!client.lockit) client.lockit = [];
    let time = args.join(" ");
    let validUnlocks = ["release", "unlock"];
    if (!time) return message.channel.send(`You must specify the Lockdown duration of the channel.\n\n**Example ➣** **\`z-lockdown 1h\`**\n*Duration must be either in hour(s), minute(s) or second(s).`)

    if(validUnlocks.includes(time)) {
        message.channel.send(`**Lockdown lifted ✅** | Everyone can now chat here`)
        message.channel.createOverwrite(message.guild.id, {
            SEND_MESSAGES: null
        })
        .then(() => {
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        })
        .catch(e => {
            message.channel.send(`Error has been occured\n${e.message}`)
        });
     } else {
         message.channel.createOverwrite(message.guild.id, {
             SEND_MESSAGES: false
         })
         .then(() => {
             let embed = new MessageEmbed()
             .setTitle(`**Channel lockdown** ⚠`)
             .setDescription(stripIndents `
             This channnel is locked by **${message.author.username}**

             **Duration ≽** ${ms(ms(time), {long: true})}
             `)
             .setColor(`RANDOM`)
             .then(() => {
                 client.lockit[message.guild.id] = setTimeout(() => {
                     message.channel.createOverwrite(message.guild.id, {
                         SEND_MESSAGES: null
                     })
                     message.channel.send(`**Lockdown lifted ✅** | Everyone can now chat here`)
                     delete client.lockit[message.guild.id]
                 }, ms(time));
             })
             .catch(e => {
                 message.channel.send(`Error has been occured\n${e.message}`)
             });
         });
    }
}

exports.conf = {
    aliases: ["lc"],
    cooldown: "3"
}

exports.help = {
    name: "lockdown",
    description: "Lock the channel for specified amount of time.",
    usage: "lockdown <duration>",
    perms: "MANAGE_CHANNELS"
}