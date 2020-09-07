const { MessageEmbed } = require("discord.js");
const moment = require("moment");

exports.run = async(client, message, args) => {
  try {
    let online = message.guild.members.cache.filter(member => member.user.presence.status !== "offline");
    let sicon = message.guild.iconURL;
    let textChannels = message.guild.channels.cache.filter(m => m.type == "text").size;
    let voiceChannels = message.guild.channels.cache.filter(i => i.type == "voice").size;

      if (message.guild.verificationLevel === "NONE") message.guild.verificationLevel = "None"
      if (message.guild.verificationLevel === "LOW") message.guild.verificationLevel = "Low"
      if (message.guild.verificationLevel === "MEDIUM") message.guild.verificationLevel = "Medium"
      if (message.guild.verificationLevel === "HIGH") message.guild.verificationLevel = "High"
      if (message.guild.verificationLevel === "VERY_HIGH") message.guild.verificationLevel = "Highest"
  

    let highestRole = message.guild.roles.cache.sort((a, b) => a.position - b.position).map(role => role.toString()).slice(1).reverse()[0];
    let region = {
      "brazil": "🇧🇷 Brazil",
      "eu-central": "🇪🇺 Central Europe",
      "singapore": "🇸🇬 Singapore",
      "us-central": "🇺🇸 U.S. Central",
      "sydney": "🇦🇺 Sydney",
      "us-east": "🇺🇸 U.S. East",
      "us-south": "🇺🇸 U.S. South",
      "us-west": "🇺🇸 U.S. West",
      "eu-west": "🇪🇺 Western Europe",
      "russia": "🇷🇺 Russia",
      "hongkong": "🇭🇰 Hong Kong",
      "southafrica": "🇿🇦 South Africa",
      "japan": "🇯🇵 Japan",
      "germany": "🇩🇪 Germany"
    }
    // Splash URL
    if(message.guild.splashURL === null) mesage.guild.splashURL = "No URL";

      if (message.guild.explicitContentFilter === "DISABLED") message.guild.explicitContentFilter = "None"
      if (message.guild.explicitContentFilter === "MEMBERS_WITHOUT_ROLES") message.guild.explicitContentFilter = "Scan members without a role"
      if (message.guild.explicitContentFilter === "ALL_MEMBERS") message.guild.explicitContentFilter = "Scan all members"
  
    // 2FA
    if(message.guild.mfaLevel === 0) message.guild.mfaLevel = "Not Enabled";
    if(message.guild.mfaLevel === 1) message.guild.mfaLevel = "Enabled";

    // Large server
    if(message.guild.large === true) message.guild.large = "Large";
    if(message.guild.large === false) message.guild.large = "Not Large";
    // AFK Channel Timeout 

    if(message.guild.afkTimeout === 0) message.guild.afkTimeout = "Disabled"
    if(message.guild.afkTimeout === 60) message.guild.afkTimeout = "1 Minute"
    if(message.guild.afkTimeout === 300) message.guild.afkTimeout = "5 Minutes"
    if(message.guild.afkTimeout === 900) message.guild.afkTimeout = "15 Minutes"
    if(message.guild.afkTimeout === 1800) message.guild.afkTimeout = "30 Minutes"
    if(message.guild.afkTimeout === 3600) message.guild.afkTimeout = "1 Hour"
    // Features

    if(message.guild.features === "INVITE_SPLASH") message.guild.features = "Custom Invite Splash Background"
    if(message.guild.features === "VIP_REGIONS") message.guild.features = "384kbps bitrate in Voice Channels"
    if(message.guild.features === "VANITY_URL") message.guild.features = "Custom Vanity Invite URL"
    if(message.guild.features === "VERIFIED") message.guild.features = "Verified Server"
    if(message.guild.features === "PARTNERED") message.guild.features = "Partnered Server"
    if(message.guild.features === "PUBLIC") message.guild.features = "Public Server"
    if(message.guild.features === "COMMERCE") message.guild.features = "Commerce Features (store channels)"
    if(message.guild.features === "NEWS") message.guild.features = "News Channels"
    if(message.guild.features === "DISCOVERABLE") message.guild.features = "Discoverable Server"
    if(message.guild.features === "FEATURABLE") message.guild.features = "Featured in the Directory"
    if(message.guild.features === "ANIMATED_ICON") message.guild.features = "Custom Animated GIF Server Icon"
    if(message.guild.features === "BANNER") message.guild.features = "Custom Banner Image Background"

    let serverembed = new MessageEmbed()
    .setTitle(`**Server Info**`)
    .setDescription(`**${message.guild.name}**`)
    .addField(`🌐 __**Basic Information**__`, `
    **ID »** ${message.guild.id}
    **Created »** ${moment.utc(message.guild.createdAt).format('LLLL')}
    **Owner »** ${message.guild.owner.user.tag} **\`[${message.guild.ownerID}]\`**
    **Large Server? »** ${message.guild.large}
    **Verification »** ${message.guild.verificationLevel}
    **2FA »** ${message.guild.mfaLevel}\n**Content Filter Level »** ${message.guild.explicitContentFilter}
    **Region »** ${region[message.guild.region]} - **\`${message.guild.region}\`**
    **Role Count »** ${message.guild.roles.cache.size}
    **Highest Role »** **${highestRole}**
    **Splash URL »** Run n!splashimg`)
    .addField(`👥 __**Members**__`, `
    **Users »** ${message.guild.memberCount - message.guild.members.cache.filter(m => m.user.bot).size}
    **Bots »** ${message.guild.members.cache.filter(m => m.user.bot).size}
    **Online »** ${online.size}\n**Total »** ${message.guild.memberCount}`, true)
    .addField(`:hash: __**Channels Summary**__`, `
    **Text »** ${textChannels}
    **Voice »** ${voiceChannels}
    **Categories »** ${message.guild.channels.cache.filter(m => m.type === 'category').size}
    **Total »** ${message.guild.channels.cache.size}
    **AFK Channel »** ${message.guild.afkChannel || `None`}
    **AFK Timeout »** ${message.guild.afkTimeout}`, true)
    .addField(`😃 __**Emojis**__`, `
    **Total »** ${message.guild.emojis.cache.size}
    **Normal »** ${message.guild.emojis.cache.filter(e => e.animated === false).size}
    **Animated »** ${message.guild.emojis.cache.filter(e => e.animated === true).size}`, true) 
    .addField(`👑 __**Guild Features**__`, `
    ${message.guild.features.join(', ') || 'None yet...\n*Boost Server with Nitro for features to show.*'}`, true)
    .setColor("#e5a64e")
    .setThumbnail(`${message.guild.iconURL({dynamic: true, size: 2048})}`)
    .setFooter(`z-serveremoji for All Guild Emojis | z-rolelist for All Guild Roles`)
    message.channel.send(serverembed);

    }catch(e) {
    message.channel.send(`Error has occurred\n\`${e.message}\``);
  };
};

exports.conf = {
  aliases: [],
  cooldown: "5"
};

exports.help = {
  name: 'serverinfo',
  description: 'Show information about this server',
  usage: 'serverinfo'
};