const { MessageEmbed } = require("discord.js")
const { get } = require("node-superfetch")
const { stripIndents } = require("common-tags")
const db = require("quick.db")

exports.run = async(client, message, args) => {
	try {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);
		if(!user) return args.missing(message, "You need to mention user you want to cuddle", client.commands.get("cuddle").help);
		
		let { body } = await get("https://nekos.life/api/v2/img/cuddle");
		
		if(user.id === message.author.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Cuddle 💟**`)
			.description(stripIndents `
			**${message.author.username},** sad to see you cuddling yourself! 
			`)
			.setImage(body.url)
			.setColor("RANDOM")
			message.channel.send(embed);
		} else if(user.id === client.user.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Cuddle 💟**`)
			.setDescription(stripIndents `
			Thanks for cuddling me, **${message.author.username}!**\n*You're good at cuddling just like Jun*
			`)
			.setImage(body.url)
			.setColor("RANDOM")
			message.channel.send(embed);
		} else {
			let embed = new MessageEmbed()
			.setTitle(`**Cuddle 💟**`)
			.setDescription(stripIndents `
			**${message.author.username}** cuddled **${user.username}!**
			`)
			.setImage(body.url)
			.setColor("RANDOM")
			return message.channel.send(embed);
			} 
	}catch(e) {
		message.channel.send(`Error has been occured\n${e.message}`);
	}
}

exports.conf = {
	aliases: [],
	cooldown: "3"
}

exports.help = {
	name: "cuddle",
	description: "Give someone a cute but nice cuddleee",
	usage: "cuddle <@user | id>"
}