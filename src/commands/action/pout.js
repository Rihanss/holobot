const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");

exports.run = async(client, message, args) => {
    try {
        const { body } = await get("https://rra.ram.moe/i/r?type=pout");

        let embed = new MessageEmbed()
        .setColor("RANDOM") 
        .setDescription(stripIndents `
        **[Click here if the image failed to load.](https://cdn.ram.moe/${body.path.replace("/i/", "")})**\n\n**${message.author.username}** just **pouting**
        `) 
        .setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
        .setFooter(`Requested by: ${message.author.tag} | Powered by Weeb.sh`, message.author.displayAvatarURL()) 
        message.channel.send(embed);

    }catch(e) {
        message.channel.send(`Error has been occured\n${e.message}`);
    }

}

exports.conf = {
    aliases: [],
    cooldown: "3"
}

exports.help = {
    name: "pout",
    description: "Express your pouting expression!",
    usage: "pout"
}