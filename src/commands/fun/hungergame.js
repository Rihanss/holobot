const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');
const { shuffle } = require('../../../util.js');
const thisplay = new Set();
const events = require('../../assets/json/hungergames.json');

exports.run = async (client, message, args) => {
	const tributes = args.slice(0);
	if(thisplay.has(message.channel.id)) return message.channel.send(`Only 1 game each channel`)
	if(tributes.length < 1) return message.channel.send(`**${message.author.username}**, Please add some tributes`);
	if (tributes.length < 2) return message.channel.send(`...**${tributes[0]}** wins, As they were the only tribute.`);
	if (tributes.length > 24) return message.channel.send(`**${message.author.username}**, Please do not enter more than 24 tributes.`);
	if(new Set(tributes).size !== tributes.length) return message.channel.send(`**${message.author.username}**, Please do not enter the same tribute twice.`);
	thisplay.add(message.channel.id);
	try {
		let sun = true;
		let turn = 0;
		let bloodbath = true;
		const remaining = new Set(shuffle(tributes));
		while(remaining.size > 1){
			if (!bloodbath && sun) ++turn;
			const sunEvents = bloodbath ? events.bloodbath : sun ? events.day : events.night;
			const results = [];
			const deaths = [];
			makeEvents(remaining, sunEvents, deaths, results);

			//${deaths.length === 1 ? '' : 's'}
			let text = `
__**${bloodbath ? 'Bloodbath' : sun ? `Day ${turn}` : `Night ${turn}`}**__:
${results.join('\n')}
			`;
			if (deaths.length) {
				text += '\n';
				text += `
**${deaths.length} lightning bolt can be seen in the distance.**
${deaths.join('\n')}
				`;
			}
			text += `\n_Proceed?_ *(yes/no)*`;
			const embed = new MessageEmbed()
			.setTitle(`**Hunger Games**`)
			.setDescription(text)
			.setColor(`GREEN`)
			await message.channel.send(embed)
			const verification = await verify(message.channel, message.author, 120000);
			if (!verification) {
				thisplay.delete(message.channel.id);
				return message.channel.send({ embed: {color: 0xff1919, description: `**${message.author.username}**, See you next time!`}});
			}
			if (!bloodbath) sun = !sun;
			if (bloodbath) bloodbath = false;
		}
		thisplay.delete(message.channel.id);
		const remainingArr = Array.from(remaining);
		return message.channel.send({ embed: { color: 0x1D82B6, description: `And the winner is... **${remainingArr[0]}**!`}});
	}catch (e){
		thisplay.delete(message.channel.id);
		return message.reply(e.stack, { code: 'ini' });
	}
}

function parseAction (event, tributes){
	return event
	.replace(/\(Player1\)/gi, `**${tributes[0]}**`)
	.replace(/\(Player2\)/gi, `**${tributes[1]}**`)
	.replace(/\(Player3\)/gi, `**${tributes[2]}**`)
	.replace(/\(Player4\)/gi, `**${tributes[3]}**`)
	.replace(/\(Player5\)/gi, `**${tributes[4]}**`)
	.replace(/\(Player6\)/gi, `**${tributes[5]}**`);
}

function makeEvents(tributes, eventsArr, deaths, results) {
	const turn = new Set(tributes);
	for (const tribute of tributes) {
		if (!turn.has(tribute)) continue;
		const valid = eventsArr.filter(event => event.tributes <= turn.size && event.deaths < turn.size);
		const event = valid[Math.floor(Math.random() * valid.length)];
		turn.delete(tribute);
		if (event.tributes === 1) {
			if (event.deaths.length === 1) {
				deaths.push(tribute);
				tributes.delete(tribute);
			}
			results.push(parseAction(event.text, [tribute]));
		} else {
			const current = [tribute];
			if (event.deaths.includes(1)) {
				deaths.push(tribute);
				tributes.delete(tribute);
			}
			for (let i = 2; i <= event.tributes; i++) {
				const turnArr = Array.from(turn);
				const tribu = turnArr[Math.floor(Math.random() * turnArr.length)];
				if (event.deaths.includes(i)) {
					deaths.push(tribu);
					tributes.delete(tribu);
				}
				current.push(tribu);
				turn.delete(tribu);
			}
			results.push(parseAction(event.text, current));
		}
	}
}

async function verify (channel, user, time){
	const validChoice = ['y', 'n', 'yes', 'no'];
	const filter = messages=> validChoice.includes(messages.content.toLowerCase()) && messages.author.id === user.id;
	let response = await channel.awaitMessages(filter, {
		max: 1,
		time
	});
	if(!response.size) return false;
	response = response.first().content.toLowerCase();
	if(response === 'y' || response === 'yes') return true;
	return false;
}
exports.conf = {
   aliases: ['hg'],
   cooldown: 3
}
exports.help = {
  name: 'hungergame', 
  category: 'Games', 
  description: "Add tributes to play hungergame max 24 tributes", 
  usage: 'hungergame <tributes>' 
} 