const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");
const db = require("quick.db");
exports.run = async(client, message, args) => {
	try {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);
		if(!user) return args.missing(message, "You need to mention user you want to feed", client.commands.get("feed").help);
		const { body } = await get("https://nekos.life/api/v2/img/feed")
		
		if(user.id === message.author.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Feed 🍫**`)
			.setDescription(stripIndents
				`**${message.author.username},** so sad to see you feeding yourself treats!
			`)
			.setImage(body.url)
			.setColor("RANDOM")
			message.channel.send(embed);
		} else if(user.id === client.user.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Feed 🍫**`)
			.setDescription(stripIndents
			`Thanks for Feeding me tasty food awoo, **${message.author.username}!**
			`)
			.setImage(body.url)
			.setColor("RANDOM")
			message.channel.send(embed); 
		} else {
			let embed = new MessageEmbed()
			.setTitle(`**Feed 🍫**`)
			.setDescription(stripIndents
				`**${message.author.username}** feeded **${user.username}!**
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
	cooldown: "3"
}

exports.help = {
	name: "feed",
	description: "Feed someone with a good taste of food",
	usage: "feed <@user | id>"
}