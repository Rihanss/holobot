const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
	try {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);
		if(!user) return args.missing(message, "You need to mention user you want to kiss", client.commands.get("kiss"));
		let kissedUser = await db.fetch(`kissedUser_${user.id}`);
		const { body } = await get("https://nekos.life/api/v2/img/kiss");

		if(user.id === message.author.id) {
		let embed = new MessageEmbed()
			.setTitle(`**Kiss**`)
			.setDescription(stripIndents `
			You seems too like kissing yourself, **${message.author.username}** is that possible?
			`)
			.setImage(body.url)
			.setColor("RANDOM")
			message.channel.sende(embed);
		} else if(user.id === client.user.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Kiss**`)
			.setDescription(stripIndents `
			Thanks for kissing me, **${message.author.username}**
			`)
			.setImage(body.url)
			.setColor("RANDOM")
			message.channel.send(embed);
		} else {
			db.add(`kissedUser_${message.mentions.users.first().id}`, 1);
			db.set(`kissedUsername_${message.mentions.users.first().id}`, message.author.username)
			let embed = new MessageEmbed()
			.setTitle(`**Kiss**`)
			.setDescription(stripIndents `
			**${message.author.username}** kissed **${user.username}!**
			`)
			.setImage(body.url)
			.setFooter(`${message.mentions.users.first().username} has now been kissed ${kissedUser + 1 || `1`} Times! | z-userstats for Love Stats`, `${message.mentions.users.first().displayAvatarURL()}`)
			.setColor("RANDOM")	
			return message.channel.send(embed);
		} 

	}catch(e) {
		message.channel.send(`Error has been occured\n\`${e.message}\``)
	}
}

exports.conf = {
	aliases: [],
	cooldown: "3"
}

exports.help = {
	name: "kiss",
	description: "Give someone a kiss",
	usage: "kiss <@user | id>"
}