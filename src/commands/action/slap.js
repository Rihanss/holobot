const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
	try {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);
		if(!user) return args.missing(message, "You need to mention user you want to slap", client.commands.get("slap").help);
		const { body } = await get("https://nekos.life/api/v2/img/slap");
		let slappedUser = await db.fetch(`slappedUser_${user.id}`);

		if(user.id === message.author.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Slap 🖐🏻**`)
			.setDescription(stripIndents `
				**${message.author.username},** seriously slapping yourself? Ouchies!
			`)
			.setImage(body.url)
			.setColor("RANDOM")
			message.channel.send(embed);
		} else if(user.id === client.user.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Slap 🖐🏻**`)
			.setDescription(stripIndents `
			Thanks for slapping me, **${message.author.username}!**
			`)
			.setImage(body.url)
			.setColor("RANDOM")
			message.channel.send(embed);
		} else {
			db.add(`slappedUser_${message.mentions.users.first().id}`, 1);
			db.set(`slappedUsername_${message.mentions.users.first().id}`, message.author.username)
			let embed = new MessageEmbed()
		  	.setTitle(`**Slap 🖐🏻**`)
			.setDescription(stripIndents `
				**${message.author.username}** slapped **${user.username}!**
			`)
			.setImage(body.url)
		  	.setFooter(`${message.mentions.users.first().username} has now been slapped ${slappedUser + 1 || `1`} Times! | z-userstats for Love Stats`, `${message.mentions.users.first().displayAvatarURL()}`)
			.setColor("RANDOM")
			return message.channel.send(embed);
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
	name: "slap",
	description: 'Give someone a cute but nice slap!', 
	usage: 'slap <@user | id>'
}