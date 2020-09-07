const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");
const db = require("quick.db")

exports.run = async(client, message, args) => {
	try {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);
		let nommedUser = await db.fetch(`nommedUser_${user.id}`);
		if(!user) return args.missing(message, "You need to mention user you want to nommed!", client.commands.get("nom").help);
		const { body } = await get("https://rra.ram.moe/i/r?type=nom");

		if(user.id === message.author.id) {
			let embed = new MessageEmbed()
			.setColor(`RANDOM`)
			.setTitle(`**Nom**`)
			.setDescription(stripIndents `
			How you manage to nom yourself? **${message.author.username}**
			`)
			.setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
			message.channel.send(embed);
		} else if(user.id === client.user.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Nom**`)
			.setDescription(stripIndents `
			Would prefer food instead of me, **${message.author.username}**
			`)
			.setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
			message.channel.send(embed);
		} else {
			let embed = new MessageEmbed()
			.setTitle(`**Nom**`)
			.setColor(`RANDOM`)
			.setDescription(stripIndents `
			**${message.author.username}** nommed **${user.username}**
			`)
			.setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
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
	name: "nom",
	description: "Give someone a nom",
	usage: "nom <@user | id>"
}