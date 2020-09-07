const { MessageEmbed } = require("discord.js");
const { get } = require("node-superfetch");
const { StriptIndents } = require("common-tags");

exports.run = async(client, message, args) => {
	try {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);
		if(!user) return args.missing(message, "You need to mention user you want to woof at", client.commands.get("woof").help);
		const { body } = await get("https://nekos.life/api/v2/img/woof");

		if(user.id === message.author.id) {
			let embed = new MessageEmbed()
			.setTitle(`**Woof 🐶**`)
			.setDescription(StriptIndents `
			**${message.author.username},** oh dear!
			`)
			.setImage(body.url).setColor("RANDOM") 
			message.channel.send(embed);	
		} else if(user.id === client.user.id) {
			const embed = new MessageEmbed()
		    .setTitle(`**Woof 🐶**`)
			.setDescription(StriptIndents `
			Thanks for being a doggie, **${message.author.username}!**
			`)
			.setImage(body.url).setColor("RANDOM") 
			message.channel.send(embed);	
		} else {
			const embed = new MessageEmbed()
		    .setTitle(`**Woof 🐶**`)
			.setDescription(StriptIndents `
			**${message.author.username}** woofed at **${user.username}!**
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
	name: 'woof', 
	description: 'Give someone a cute but nice Woofing but Doggo Woof at someone!', 
	usage: 'woof <@user | id>'
}