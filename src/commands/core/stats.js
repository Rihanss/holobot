const { MessageEmbed, version } = require("discord.js");
const { stripIndents } = require("common-tags");
const { get } = require("node-superfetch");
const cpuStat = require('cpu-stat');
const db = require("quick.db");

exports.run = async(client, message) => {
	let totalCores = cpuStat.totalCores();
	let avgClockMHz = cpuStat.avgClockMHz();
	cpuStat.usagePercent(function(err, percent, seconds) {
		if(err) return console.log(err)
	
	const embed = new MessageEmbed()
	.setAuthor(`${client.user.username} statistics`, client.user.displayAvatarURL())
	.setDescription(stripIndents `
	\`\`\`A statistics monitoring module. Contains essential information regarding our service and bot information. Wrapped with beautiful Discord.js Interactive Library and MessageEmbed amazing Constructor.\`\`\`
	`)
	.setThumbnail(client.user.displayAvatarURL({format: 'png', size: 1024 }))
	.addField('**__Server information__**', stripIndents `\`\`\`
	• Operating System: Enterprise Linux 7
	• Kernel: 4.18.0-34-Enterprise
	• Processor: Intel(R) Xeon(R) Gold 6140 CPU @ 2.70GHz
	• Architecture: x86_x64
	• Total CPU Cores: ${totalCores}
	• CPU Clock Speed: ${avgClockMHz} MHz
	• Node.js: ${process.version}
	• Discord.js: v${version}
	• Websocket: ${client.ws.ping.toFixed(2)}ms
	\`\`\``)
	.addField('**__General information__**', stripIndents `\`\`\`
	• Guilds: ${client.guilds.cache.size}
	• Channels: ${client.channels.cache.size}
	• Users: ${client.users.cache.size}
	• Uptime: ${client.util.parseDur(client.uptime)}
	\`\`\``)
	.addField('**__Usage information__**', stripIndents `\`\`\`
	• Memory usage:
	${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS
	${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap
		
	• CPU usage:
	System: ${percent.toFixed(2)}%

	• Voice Connections:
	Connected to: ${client.voice.connections.size} Voice Channels
	\`\`\``)
	.setColor("RANDOM")
	//.setImage("https://cdn.discordapp.com/attachments/709427102642077786/713798807501930566/nitro.gif")
	.setFooter(`Requested by: ${message.author.tag} | ${client.user.username} v${client.version}`)
	message.channel.send(embed);
	/*
	const embed = new MessageEmbed()
	.setAuthor(`${client.user.username} statistics`, client.user.displayAvatarURL)
	.setDescription(stripIndents `
	\`\`\`A statistics monitoring module. Contains essential information regarding our service and bot information. Wrapped with beautiful Discord.js Interactive Library and RichEmbed amazing Constructor.\`\`\`
	`)
	.addField('Server information', `\`\`\`• Operating System: Enterprise Linux 7\n• Kernel: 4.18.0-34-Enterprise\n• Processor: Intel(R) Xeon(R) Gold 6140 CPU @ 2.70GHz\n• Architecture: x86_x64\n• Node.js: ${process.version}\n• Discord.js: v${version}\n• Websocket: ${client.ping.toFixed(2)}ms\`\`\``)
	.addField('General information', `\`\`\`• Guilds: ${client.guilds.size}\n• Channels: ${client.channels.size}\n• Users: ${client.users.size}\n• Uptime: ${client.util.parseDur(client.uptime)}\`\`\``)
	.addField('Usage information', `\`\`\`• Memory usage:\n${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap\n• Voice Connections:\nConnected to: ${client.voice.connections.size} Voice Channels\n\n• CPU usage:\nNode: ${(process.cpuUsage().user / 1024 / 1024).toFixed(2)}%\nSystem: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\`\`\``)
	.setFooter(`Requested by: ${message.author.tag} | ${client.user.username} v${client.version}`)
	message.channel.send(embed) */
})
}

exports.conf = {
	aliases: ["botstats", "info"],
	cooldown: "3"
}

exports.help = {
	name: "stats",
	description: "Check statistics of the bot",
	usage: "stats"
}