const { MessageEmbed } = require('discord.js')
const moment = require('moment')

exports.run = (client, message, args) => {

    //Defining the Channel with the Name, ID etc.
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var channel;

    if(!args[0]) {
        channel = message.channel
    }
    else if(message.guild.channels.cache.some(channl => channl.id === args[0])) {
        channel = message.guild.channels.get(args[0])
    }
    else if(message.mentions.channels.cache.first()) {
        channel = message.mentions.channels.first()
    }
    else if(message.guild.channels.cache.some(channl => channl.name === args.join(" "))) {
        channel = message.guild.channels.find(channl => channl.name === args.join(" "))
    }
    else if(channel === undefined) {
        return message.channel.send("**NateBot |** **This channel doesn't exist!**\n\n*Make sure you use the correct Text Channel Name or ID.*\n**Example: \`n!textchannelinfo 602831283630112768\`**")
    }
    
       //Text channel NSFW?
       if(channel.nsfw === false) channel.nsfw = "No ❌"
       if(channel.nsfw === true) channel.nsfw = "Yes :warning:"

    //Categories
    if(channel.parent === null) channel.parent = "Not in Category"
  
  //Rate limits
  if(channel.rateLimitPerUser === 0) channel.rateLimitPerUser = "Disabled"
  if(channel.rateLimitPerUser === 5) channel.rateLimitPerUser = "5 Seconds"
  if(channel.rateLimitPerUser === 10) channel.rateLimitPerUser = "10 Seconds"
  if(channel.rateLimitPerUser === 15) channel.rateLimitPerUser = "15 Seconds"
  if(channel.rateLimitPerUser === 30) channel.rateLimitPerUser = "30 Seconds"
  if(channel.rateLimitPerUser === 60) channel.rateLimitPerUser = "1 Minute"
  if(channel.rateLimitPerUser === 120) channel.rateLimitPerUser = "2 Minutes"
  if(channel.rateLimitPerUser === 300) channel.rateLimitPerUser = "5 Minutes"
  if(channel.rateLimitPerUser === 600) channel.rateLimitPerUser = "10 Minutes"
  if(channel.rateLimitPerUser === 900) channel.rateLimitPerUser = "15 Minutes"
  if(channel.rateLimitPerUser === 1800) channel.rateLimitPerUser = "30 Minutes"
  if(channel.rateLimitPerUser === 3600) channel.rateLimitPerUser = "1 Hour"
  if(channel.rateLimitPerUser === 7200) channel.rateLimitPerUser = "2 Hours"
  if(channel.rateLimitPerUser === 21600) channel.rateLimitPerUser = "6 Hours"

    
        //User Limit
        if(channel.userLimit === 0) channel.userLimit = "∞ (Infinite Limit)"
        if(channel.userLimit === 99) channel.userLimit = "99 (Fixed Max Limit)"

        //Joinable Channel?
        if(channel.joinable === false) channel.joinable = "No"
        if(channel.joinable === true) channel.joinable = "No"
    
        //Date formatting
        let chacreadate = channel.createdAt
        let chacreadatef = moment(chacreadate).format("MMMM Do YYYY");
        let chacreadatefr = chacreadatef.substring(0,1).toLocaleUpperCase() + chacreadatef.substring(1);
  
        //Channel Type
        const chnltype = channel.type === "text" ? "Text :hash:" : "Voice 🔊"
  
      //Voice Channel
      let voiceembed = new MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`**Voice | #${channel.name}**`)
        .setDescription(`**ID »** ${channel.id}\n**Category »** ${channel.parent || `Not in Category`}\n**Created »** ${moment.utc(channel.createdAt).format('MMMM Do YYYY')}\n**Joinable? »** ${channel.joinable || ``}\n**Position »** ${channel.calculatedPosition || `0`}\n**User Limit »** ${channel.userLimit}\n**Bitrate »** ${channel.bitrate} Kbps`)
        .setThumbnail(`${channel.guild.iconURL}?size=2048`)
      
        //Text Channel
        let channelembed = new MessageEmbed()
          .setColor(`GREEN`)
          .setTitle(`**Text | #${channel.name}**`)
          .setDescription(`*${channel.topic || `No Topic Description...`}*\n\n**ID »** ${channel.id}\n**Category »** ${channel.parent ||`Not in Category`}\n**Created »** ${moment.utc(channel.createdAt).format("MMMM Do YYYY")}\n**Members »** ${channel.members.size || `0`}\n**Position »** ${channel.calculatedPosition || `0`}\n**Slowmode? »** ${channel.rateLimitPerUser}\n**NSFW? »** ${channel.nsfw}`)
          .setThumbnail(`${channel.guild.iconURL}?size=2048`)
  
        if(chnltype === "Voice 🔊") return message.channel.send(voiceembed)
            else {
              message.channel.send(channelembed)
                  }
            }

exports.conf = {
  aliases: [],
  cooldown: "3"
};

exports.help = {
  name: 'channelinfo',
  description: 'Check info of channel!',
  usage: 'channelinfo'
};
