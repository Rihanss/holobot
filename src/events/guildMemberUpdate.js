const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = async(client, oldMember, newMember) => {
  try {
    let Changes = {
      unknown: 0,
      addedRole: 1,
      removedRole: 2,
      username: 3,
      nickname: 4,
      avatar: 5
    };
    let change = Changes.unknown;

    let dif = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first()
    let diff = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first()
    if (oldMember.roles.size !== newMember.roles.size) {
      if (oldMember.roles.size > newMember.roles.size) {
         change = Changes.removedRole;
         let removedRole = diff.name;
      } else if (oldMember.roles.size < newMember.roles.size) {
         change = Changes.addedRole;
         let addedRole = dif.name;
      }
    }
    
    if(newMember.user.username != oldMember.user.username) change = Changes.username;
    if(newMember.nickname != oldMember.nickname) change = Changes.nickname;
    if(oldMember.user.avatar !== newMember.user.avatar) change = Changes.avatar;

    let on = await db.fetch(`loggingchnl_${oldMember.guild.id}`);
    if(on === null) return;
    if(on === "off") return;
    if(on === "on") {
      let channel = await db.fetch(`loggingchnl_${oldMember.guild.id}`)
      let chnl = oldMember.guild.channels.cache.get(channel)
      if(!channell) return;

      if (chnl != null) {
        switch(change) {
          case Changes.unknown:
            let embed = new MessageEmbed()
            .setColor(color)
            .setDescription('**User Update** ' + newMember)
            chnl.send(embed);
            break;
            case Changes.addedRole:
            let embed2 = new MessageEmbed() 
            .setColor(color)
            .setAuthor(`${newMember.user.tag} | Added Role`, newMember.user.displayAvatarURL) 
            .setDescription(`${newMember.user} **was given the \`${addedRole}\` role**`)
            .setFooter(`ID: ${newMember.user.id}`).setTimestamp() 
            chnl.send(embed2);
            break;
            case Changes.removedRole:
            let embed3 = new MessageEmbed() 
            .setColor(color)
            .setAuthor(`${newMember.user.tag} | Removed Role`,  newMember.user.displayAvatarURL) 
            .setDescription(`${newMember} **was removed from the \`${removedRole}\` role**`)
            .setFooter(`ID: ${newMember.user.id}`).setTimestamp() 
            chnl.send(embed3);
            break;
            case Changes.username:
            let embed4 = new MessageEmbed() 
            .setColor(color)
            .setAuthor(`${newMember.user.username} | Username Changed`, newMember.user.displayAvatarURL) 
            .setDescription('**Username changed from** ' +
            oldMember.user.username + '#' + oldMember.user.discriminator + ' **to** ' +
            newMember.user.username + '#' + newMember.user.discriminator)
            .setFooter(`ID: ${newMember.id}`)
            .setTimestamp() 
            chnl.send(embed4);
            break;
            case Changes.nickname:
            let embed5 = new MessageEmbed() 
            .setColor(color)
            .setAuthor(`${newMember.user.tag} | Nickname Changed`, newMember.user.displayAvatarURL) 
            .addField('Before', oldMember.nickname != null ? `${oldMember.nickname}` : `${oldMember.user.tag}`) 
            .addField('After', newMember.nickname != null ? `${newMember.nickname}` : `${newMember.user.tag}`)
            .setFooter(`ID: ${newMember.user.id}`).setTimestamp() 
            chnl.send(embed5);
            break;
            case Changes.avatar:
            let embed6 = new MessageEmbed() 
            .setColor(color)
            .setAuthor(`${newMember.user.tag} | Avatar Changed`, newMember.user.displayAvatarURL)
            .setDescription(`**${newMember.user.tag} Changed their avatar**`);
            chnl.send(embed6);
            break;
          };
        };
      };
    }catch(e) {
      console.log(`Error has been occured\n${e.message}`);
    };
  };