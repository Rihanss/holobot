const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

exports.run = async(client, message, args, perms) => {
  try {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return args.missing(message, "You don't have enough permission to do this [Manage Message]", client.commands.get("purge").help);
    if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`I don't have permission to \`MANAGE_MESSAGES\` permission`);
    if(isNaN(args[0])) return message.channel.send(`You must specifiy a number to purge messages on **${message.channel.name}** | Only **100** Messages can be deleted!`);
    if(args[0] > 100) return message.channel.send(`Too many messages!\n**Specify less than \`100\` to delete**`);

    message.channel.bulkDelete(args[0]).catch(e => {
      const embed = new MessageEmbed()
      .setDescription(stripIndents `
      Error has been occured\n${e.message}
      `)
      .setColor(`RANDOM`)
      return message.channel.send(embed)
    })
    .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/100\` messages**`))

  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
  }

} 

exports.conf = {
  aliases: ["clear"],
  cooldown: "5"
}

exports.help = {
  name: "purge",
  description: "Remove up to 99 messages in the channel",
  usage: "purge <amount>",
  perms: "MANAGE_MESSAGES"
}
