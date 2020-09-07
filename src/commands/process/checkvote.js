const DBL = require('dblapi.js')
const config = require('../../config.json')
const dbl = new DBL(process.env.DBLTOKEN)
const { MessageEmbed } = require('discord.js')
const { owners_id } = require('../../config.json');

exports.run = async(client, message, args) => {

    owners_id.forEach(async function(owner){
    if(message.author.id !== owner) return;

  let user = message.mentions.users.first() || client.users.get(args[0])
 dbl.hasVoted(user.id).then(voted => {
   if(!voted) {
    const embed = new MessageEmbed()
    .setDescription(`**${user.username}** is not voted me yet.`)
    .setColor(`RED`)
    message.channel.send(embed)
     } else {
      message.channel.send(`Yay! **${user.username}** already voted me :)`)


     }


 })

    })
}

exports.conf = {
	aliases: ['cv', 'checkvoting'],
	cooldown: '3'
	}

exports.help = {
	name: 'checkvote',
	description: 'check dbl vote',
	usage: 'checkvote <@user or id>'
	}
