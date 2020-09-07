const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");
let ms = ["on", "off"]

exports.run = async(client, message, args, color,  prefix) => {
  try {
    if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== "292936070603997185") return args.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("settings").help);
    let options = args.join(" ");
    if(!options) {
      let embed = new MessageEmbed()
      .setTitle(`**${message.guild.name}'s** Guild settings`)
      .setDescription(stripIndents `
      **»** ${prefix || `z-`}settings levelmsg set <on|off> 
      **»** ${prefix || `z-!`}settings muterole set <on|off> 
      **»** ${prefix || `z-!`}settings welcomebackground set <image link>
      **»** ${prefix || `z-!`}settings autorole set <role name>

      These Guild Settings currently show their status and changing these settings require the **MANAGE_GUILD** permission to do so. To retrieve the bot prefix, you can always mention Nate Bot to get the prefix.

      **Settings Example:** Toggling the Level Up Message, **OFF** means Message will not show and **ON** means the Level Up Message will show in the Server when you Level Up.
      `)
    .setColor(color)
    .setFooter(`These settings will ONLY affect this Guild... Not Other Guilds.`)
    message.channel.send(embed);
    } else {
      if(options.match("muterole set")) {
      if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== "292936070603997185") return args.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("settings").help);
      let input = args.slice(2).join(" ");
      let role = message.guild.roles.find(x => x.name === `${input}`);
      if(!role) return message.channel.send(`Role with name \`${input}\` cannot be found.`);
      await db.set(`mutedrole_${message.guild.id}`, role);

      const embed = new MessageEmbed()
      .setDescription(`Muted role has been set to **${input}**`)
      .setColor(`GREEN`)
      message.channel.send(embed);
      } else {
        if(options.match("levelingmsg set")) {
          if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== "292936070603997185") return args.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("settings").help);          let input = args[2]
          ms.forEach(async function(onoff) {
            if(input !== onoff) return;
            if(!input) return message.channel.send(`Please specify what you want to set! Example: \`levelingmessage set off\``);
            await db.set(`levelingmessage_${message.guild.id}`, input)

            var embed4 = new MessageEmbed()
            .setDescription(`Leveling message is now set to **\`${input}\`**`)
            .setColor(`GREEN`)
            message.channel.send(embed4)
          })
        } else {
          if(options.match("welcomebackground set")) {
            const regex = /(https?:\/\/)?(www\.)?(discord(\.|dot|\(dot\))(gg|io|me|li)|discord\.com\/invite)\/.+[a-z]/ig.test(message.content);
            if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== "292936070603997185") return args.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("settings").help);            let input = args[2]
            if(!input.includes('https' ||'http')) {
              return message.channel.send(`Please include a link to the image!`)
            }
            await db.set(`welcomebackground_${message.guild.id}`, input)

            const embed = new MessageEmbed()
            .setTitle(`Welcomer`)
            .setDescription(`Custom Welcome Image has been Set!\n*This will appear on the Welcomer when activated!*\n**Preview:**`)
            .setImage(input)
            .setColor(`GREEN`)
            message.channel.send(embed)
          } else {
            if(options.match("autorole set") && message.author.id !== '292936070603997185') {
              if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== "292936070603997185") return args.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("settings").help);              var input = args[2]
              let role = message.guild.roles.find(x => x.name === `${input}`)
              if(!role) return message.channel.send(`I couldn't find role with name ${input}`)
              let data = client.autorole.set(message.guild.id, {
                role: role,
                onoff: null
              })
                
              const embed = new MessageEmbed()
              .setAuthor(message.guild.name, message.guild.iconURL)
              .setDescription(`Auto role has been set to: ${role}`)
              .setColor(`GREEN`)
              .setTimestamp()
              message.channel.send(embed)
          } else {
            if(options.match("autorole onoff")) {
              if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== "292936070603997185") return args.missing(message, "You don't have enough permission to do this [Manage Server]", client.commands.get("settings").help);              var input = args[2]
              if(input !== 'on' | 'off') return message.channel.send(`Please set if autorole on or off!`)
              let data = client.autorole.set(message.guild.id, {
                onoff: input
              })
              
              const embed = new MessageEmbed()
              .setAuthor(message.guild.name, message.guild.iconURL)
              .setDescription(`Auto role has been set to ${input}`)
              .setColor(`GREEN`)
              .setTimestamp()
              message.channel.send(embed)
            }
              }
            }
          }
        }
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
  name: "settings",
  description: "Bot Settings the Server Administrators can change.", 
  usage: "settings",
  perms: "MANAGE_GUILD"
}