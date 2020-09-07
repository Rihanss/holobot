const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');
const { stripIndents } = require("common-tags");
const db = require("quick.db")

exports.run = async(client, message, args, color) => {
	try {
	var user = message.mentions.users.first() || client.users.cache.get(args[0]);
	if (!user) return args.missing(message, 'You need to mention user you want to tickle', client.commands.get('tickle').help);
	const { body } = await get('https://nekos.life/api/v2/img/tickle');
	
	if(user.id === message.author.id) {
		var embed = new MessageEmbed()
    	.setTitle(`**Tickle 😂**`)
		.setDescription(stripIndents `
		**${message.author.username},** so sad to see you ticklingggggggg yourself!
		`)
		.setImage(body.url).setColor("RANDOM") 
		message.channel.send(embed);
	} else if(user.id === client.user.id) {
		var embed = new MessageEmbed()
    	.setTitle(`**Tickle 😂**`)
		.setDescription(stripIndents `
		ooh, ahaaha aaa uwwuuw, that tickles **${message.author.username}!**
		`)
		.setImage(body.url).setColor("RANDOM") 
		message.channel.send(embed);
	} else {
    	db.add(`tickleUser_${message.mentions.users.first().id}`, 1);
		db.set(`tickleUsername_${message.mentions.users.first().id}`, message.author.username)
		var embed = new MessageEmbed()
		.setTitle(`**Tickle 😂**`)
		.setDescription(stripIndents `
		**${message.author.username}** tickled **${user.username}!**
		`)
		.setImage(body.url)
		.setColor("RANDOM")
		return message.channel.send(embed);
	} 
	
	}catch(e) {
		message.channel.send(`Error has been occured\n${e.message}`)
	}
}

exports.conf = {
	aliases: [], 
	cooldown: '6'
}
   
exports.help = {
   	name: 'tickle', 
    description: 'Give someone a cute but nice tickle!', 
    usage: 'tickle <@user | id>'
} 