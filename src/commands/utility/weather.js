const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports.run = (client, message, args) => {
  try {
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) return message.channel.send(`Please input a location!`);
      if (result === undefined || result.length === 0) {
          message.channel.send('Invalid location. Make sure you type correctly.')
          return;
      }
      var current = result[0].current;
      var location = result[0].location;
      const embed = new MessageEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather for ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor(0x00AE86)
      .addField('**__Degree Type__**',location.degreetype, true)
      .addField('**__Temperature__**',`${current.temperature} Degrees`, true)
      .addField('**__Feels Like__**', `${current.feelslike} Degrees`, true)
      .addField('**__Winds__**',current.winddisplay, true)
      .addField('**__Humidity__**', `${current.humidity}%`, true)
      .addField('**__Short day__**', current.shortday, true)
      .setFooter(`Date: ${current.date}`)
      message.channel.send({embed});
  })
    } catch(err) {
      return message.channel.send(`Ooops. Error has been occured! Please report this to support server!\n\`${err.message}\``)
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Users"
};

exports.help = {
	name: "weather",
  category: "Util",
  description: "Check the weather for specific area",
  usage: "weather <city>"
}