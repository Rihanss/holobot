const { MessageEmbed } = require("discord.js");
const { owners_id, bot_prefix } = require("../../config.json");
const { stripIndents } = require("common-tags");

exports.run = async(client, message, args, color) => {
  let prefix = bot_prefix;
  if(!args[0]) {
    let module = client.helps.array();
    if(!owners_id.includes(message.author.id)) module = client.helps.array().filter(x => !x.hide);
    const embed = new MessageEmbed()
    .setThumbnail("https://i.imgur.com/jNZ7ljo.png")
    .setColor(color)
    .setTitle(`**Holo Help**`)
    .setDescription(stripIndents `
    To get specific command help, run \`${prefix}help <command>\`\n**\`<>\` required** and **\`[]\` optional**
    `)
    .setFooter(`Prefix » z- (Changeable) | Don't include <> or [] when running commands`)
    for (const mod of module) {
      embed.addField(`**${mod.name}**`, mod.cmds.map(x => `**\`${x}\`**`).join(' '));
    }
    return message.channel.send(embed);
  } else {
    let cmd = args[0];
    if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      let name = `${command.help.name}`;
      let desc = command.help.description;
      let aliases = command.conf.aliases;
      let usage = `${prefix}${command.help.usage}`;

      let embed = new MessageEmbed()
      .setThumbnail('https://i.imgur.com/jNZ7ljo.png') 
      .setTitle(`**${name} Command**`) 
      .setDescription(stripIndents `
      *${desc}*\n\n**Usage » \`${usage}\`**\n**Aliases »** ${aliases[0] ? `${aliases.join(`, `)}` : `No Aliases`}
      `)
      .setColor(color)
      .setFooter(`Don't include [] or <> when running commands`) 
      return message.channel.send(embed);
    }
    if (!client.commands.has(cmd) || !client.commands.get(client.aliases.get(cmd))) {
			const xembed = new MessageEmbed()
			.setColor('#ff6666')
			.setTitle('**Holo Help**')
			const search = client.commands.keyArray().filter(x => x.includes(args[0])).map(x => `**\`${x}\`**`);
			search.length > 0 ? xembed.setDescription('**Command not found!** ❌\n*Here are your closest Command matches:*\n\n' + search.join('\n')) : undefined;
			return message.channel.send(xembed);
    } 
  }
}

exports.conf = {
  aliases: ["h", "commands", "cmds", "cmdslist", "cmdlist"],
  cooldown: "3"
}

exports.help = {
  name: "help",
  description: "Shows all the available commands",
  usage: "help [commands]"
}