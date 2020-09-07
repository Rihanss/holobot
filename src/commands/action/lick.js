const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
	try {
		let user = message.mentions.users.first() || client.users.cache.get(args[0])
		if(!user) return args.missing(message, 'You need to mention user you want to lick', client.commands.get('lick').help);
		let lickedUser = await db.fetch(`lickedUser_${user.id}`);
		const { body } = await get('https://rra.ram.moe/i/r?type=lick')

		if(user.id === message.author.id) {
			let embed = new MessageEmbed()
			.setColor(`RANDOM`)
			.setTitle(`**Lick**`)
			.setDescription(stripIndents `
			**${message.author.username}**,	You successfully licked yourself, but how?!
			`)
			.setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
			message.channel.send(embed);
		} else if(user.id === client.user.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Lick**`)
			.setDescription(stripIndents `
			Ehm, a lick? Thanks anyway, **${message.author.username}**
			`)
			.setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
			message.channel.send(embed);
		} else {
			let embed = new MessageEmbed()
			.setTitle(`**Lick**`)
			.setDescription(stripIndents `
			**${message.author.username}** licked **${user.username}**
			`)
			.setColor(`RANDOM`)
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
	name: "lick",
	description: "Give someone a lick",
	usage: "lick <@user | id>"
}