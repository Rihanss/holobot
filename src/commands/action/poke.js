const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
	try {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);
		if(!user) return args.missing(message, "You need to mention user you want to poke", client.commands.get("poke").help);
		const { body } = await get("https://nekos.life/api/v2/img/poke");
		let pokedUser = await db.fetch(`pokedUser_${user.id}`);

		if(user.id === message.author.id) {
			let embed = new MessageEmbed()
			.setColor(color)
			.setTitle(`**Poke 👉🏻**`)
			.setDescription(stripIndents `
			**${message.author.username},** so sad to see you poking yourself!
			`)
			.setImage(body.url)
			message.channel.send(embed);
		} else if(user.id === client.user.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Poke 👉🏻**`)
			.setDescription(stripIndents `
			Thanks for poking me, **${message.author.username}!**
			`)
			.setImage(body.url)
			message.channel.send(embed);
		} else {
			db.add(`pokedUser_${message.mentions.users.first().id}`, 1);
			db.set(`pokedUsername_${message.mentions.users.first().id}`, message.author.username)
			let embed = new MessageEmbed()
			.setTitle(`**Poke 👉🏻**`)
			.setDescription(stripIndents `
			**${message.author.username}** poked **${user.username}!**
			`)
			.setImage(body.url)
			.setFooter(`${message.mentions.users.first().username} has now been poked ${pokedUser + 1 || `1`} Times! | z-userstats for Love Stats`, `${message.mentions.users.first().displayAvatarURL()}`)
			.setColor("RANDOM")
			return message.channel.send(embed);
		} 
			
	}catch(e) {
		message.channel.send(`Error has been occured\n${e.message}`);
	}

}

exports.conf = {
	aliases: [], 
	cooldown: '3'
}
exports.help = {
   name: 'poke', 
   description: 'Give someone a cute but nice poke!', 
   usage: 'poke <@user | id>'
}