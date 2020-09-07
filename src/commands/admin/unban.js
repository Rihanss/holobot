const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const guildMemberAdd = require("../../events/guildMemberAdd");

exports.run = async(client, message, args) => {
    if(!message.member.hasPermission("UNBAN_MEMBERS")) return message.channel.send(`You need \`UNBAN_MEMBERS\` permission to unan members.`);
    if(!message.guild.member(client.user).hasPermission("UNBAN_MEMBERS")) return message.channel.send(`You need \`UNBAN_MEMBERS\` permission to unban members.`);
    try {
        let user = args[0];
        let reason = args.slice(1).join(" ")
        let bannedMember;
        if(!reason) reason = "No reason provided.";

        try{                                                            
            bannedMember = await client.users.fetch(args[0])
        }catch(e){
            if(!bannedMember) return message.channel.send("That is not a valid ID");
        }
        try {
            await message.guild.fetchBan(args[0])
        } catch(e){
          return message.channel.send('User not banned');
        }
        
        const embed = new MessageEmbed()
        .setTitle(`**Server Unban**`)
        .setColor(`GREEN`)
        .setDescription(stripIndents`
        **\`${bannedMember.username}\`** was unbanned from **\`${message.guild.name}\`**

        **Reason ≽** ${reason || `N/A`}
        **Moderator ≽** ${message.author.tag}
        `)
        
        message.channel.send(embed);
        message.guild.members.unban(bannedMember, reason);
    }catch(e) {
        message.channel.send(`Error has been occured\n\`${e.message}\``)
    }
}

exports.conf = {
    aliases: [],
    cooldown: "3"
}
  
exports.help = {
    name: "unban",
    description: "Unban a member from the server",
    usage: "unban <@user | id> [reason]",
}