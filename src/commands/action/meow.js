const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
	try {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);
		if(!user) return args.missing(message, 'You need to mention user you want to Meow', client.commands.get("meow").help);
		const { body } = await get('https://nekos.life/api/v2/img/meow');

		if(user.id === message.author.id) {
			let embed = new MessageEmbed()
			.setColor(`RANDOM`)
			.setTitle(`**Meow**`)
			.setDescription(stripIndents `
			**${message.author.username}**, so meowing sad!
			`)
			.setImage(body.url)
			message.channel.send(embed);
		} else if(user.id === client.user.id) {
			let embed = new MessageEmbed()
			.setDescription(stripIndents `
			Thanks for being a cat, **${message.author.usernamee}**
			`)
			.setImage(body.url)
			message.channel.send(embed);
		} else {
			let embed = new MessageEmbed()
			.setDescription(stripIndents `
			**${message.author.username}** meowed at **${user.username}**
			`)
			.setColor(`RANDOM`)
			.setImage(body.url)
			return message.channel.send(embed);
		}


	}catch(e) {
		return message.channel.send(`Error has been occured\n${e.message}`)
	}
}

exports.conf = {
	aliases: [],
	cooldown: "3"
}

exports.help = {
	name: "meow",
	description: "Give someone a cute meow.. Nyaa",
	usage: "meow <@user | id>"
}