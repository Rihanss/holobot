const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
	try {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);
		if(!user) return args.missing(message, "You need to mention user you want to pat", client.commands.get("pat").help);
		let pattedUser = await db.fetch(`pattedUser_${user.id}`);
		const { body } = await get("https://nekos.life/api/v2/img/pat")

		if(user.id === message.author.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Pat 😇**`)
			.setDescription(stripIndents `
			**${message.author.username},** so sad to see you patting yourself!
			`)
			.setImage(body.url).setColor("RANDOM") 
			 message.channel.send(embed);
		} else if(user.id === client.user.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Pat 😇**`)
			.setDescription(stripIndents `
			Thanks for patting me, **${message.author.username}!**
			`)
			.setImage(body.url).setColor("RANDOM")
			 message.channel.send(embed);
		} else {
			db.add(`pattedUser_${message.mentions.users.first().id}`, 1);
			db.set(`pattedUsername_${message.mentions.users.first().id}`, message.author.username)
			let embed = new MessageEmbed()
			.setTitle(`**Pat 😇**`)
			.setDescription(stripIndents `
			**${message.author.username}** patted **${user.username}!**
			`)
			.setImage(body.url)
			.setFooter(`${message.mentions.users.first().username} has now been patted ${pattedUser + 1 || `1`} Times! | z-userstats for Love Stats`, `${message.mentions.users.first().displayAvatarURL()}`)
			.setColor("RANDOM")
			return message.channel.send(embed);
		}

	}catch(e) {
		message.channel.send(`Error has been occured\n${e.message}`)
	}

}

exports.conf = {
	aliases: [], 
	cooldown: '3'
}
exports.help = {
   name: 'pat', 
   description: 'Give someone a cute but nice pat!', 
   usage: 'pat <@user | id>'
}