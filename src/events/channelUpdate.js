const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = async(client, oldChannel, newChannel) => {
  try {
    var Changes = {
      unknown: 0,
      topic: 1,
      name: 2
    };
    var change = Changes.unknown;

    if(newChannel.name != oldChannel.name) change = change.name;
    if(newChannel.topic != oldChannel.topic) change = change.topic;

    let on = await db.fetch(`logging_${oldChannel.guild.id}`);
    if(on === null) return;
    if(on === "off") return;
    if(on === "on") {
      let channel = await db.fetch(`loggingchnl_${oldChannel.guild.id}`);
      let chnl = oldChannel.guild.channels.cache.get(channel);
      if(!channel) return;

      if(chnl != null) {
        switch (change) {
          case Changes.unknown:
            let embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Channel Updated: ${newChannel.name}`)
            .setFooter(`ID: ${newChannel.id}`).setTimestamp()
          //  channel.send(embed)
            break;
            case Changes.topic:
            let embed1 = new MessageEmbed()
            .setColor(color)
            .setAuthor(`Channel Topic Updated`)
            .setDescription(`Channel: ${newChannel.name}`)
            .addField('Before', `${oldChannel.topic}` || 'No topic')
            .addField('After', `${newChannel.topic}` || 'No topic')
            .setFooter(`ID: ${newChannel.id}`).setTimestamp()
            chnl.send(embed1);
            break;
            case Changes.name:
            let embed2 = new MessageEmbed()
            .setColor(color)
            .setAuthor(`Channel Name Updated`)
            .setDescription(`Channel: ${newChannel}`)
            .addField('Before', `${oldChannel.name}` || 'No name')
            .addField('After', `${newChannel.name}` || 'No name')
            .setFooter(`ID: ${newChannel.id}`).setTimestamp()
            chnl.send(embed2);
            break;
          };
        };
      };
    }catch(e) {
      console.log(`Error has been occured\n${e.message}`);
    };
  };