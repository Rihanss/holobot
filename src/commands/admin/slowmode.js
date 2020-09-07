const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

exports.run = async(client, message, args) => {
  try {
    if(!message.member.hasPermissions(["MANAGE_MESSAGES", "MANAGE_CHANNELS"])) return args.missing(message, "You don't have enough permission to do this! [Manage Message & Manage Channels]", client.commands.get("slowmode").help);
    let duration = args[0];

    let embed = new MessageEmbed()
    .setTitle(`**Slowmode**`)
    .setDescription(stripIndents `
**Usage:**
• z-slowmode <duration | s | m | h / off>

**Example:**
• z-slowmode 5s
• z-slowmode off

**Notice:**
• Slowmode duration can only be below 6h
    `)
    if(!duration) {
      return message.channel.send(embed);
    }

  duration = await duration.toString();

  if (duration.indexOf("s") !== -1) {
    // Detik = second
    var durationsec = await duration.replace(/s.*/, "");
    var durationms = (await durationsec);
  } else if (duration.indexOf("m") !== -1) {
    // Menit = Minute
    var durationmin = await duration.replace(/m.*/, "");
    durationms = (await durationmin) * 60;
  } else if (duration.indexOf("h") !== -1) {
    // Jam = Hour
    var durationhour = await duration.replace(/h.*/, "");
    durationms = (await durationhour) * 60 * 60;
  } else if(duration === "off") {
    message.channel.setRateLimitPerUser(0)
    return message.channel.send(`${message.channel} slowmode is now off. Everyone can post normally.`)
  } else {
    return message.channel.send(`Available Format: \`<number>[s/m/h/d]\``);
  }
  if(durationms > 21600) return message.channel.send(`Slowmode cannot go beyond 6 hours.`)
    if(duration.includes("-")) return message.channel.send(`Slowmode duration cannot go negative!`)
  message.channel.setRateLimitPerUser(durationms)
  message.channel.send(`${message.channel} is now on slowmode. Normal users can only post once **${duration}**`)
  
  
}catch(err) {
  message.channel.send(`Error has been occured! Please report this to support server!\n\`${err.message}\``)
}
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "slowmode",
  description: "set cooldown of the channel for amount of duration",
  usage: "slowmode <duration>",
  perms: "MANAGE_MESSAGES & MANAGE_CHANNELS"
}