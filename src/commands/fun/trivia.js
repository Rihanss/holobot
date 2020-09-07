const { get } = require('node-superfetch')
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");
const choices = ['1', '2', '3', '4'];
const util = require('../../../util.js')

exports.run = async (client, msg, args) => {
	try{
		const { body } = await get('https://opentdb.com/api.php?amount=4')
		.query({
			amount: 1,
      encode: 'url3986'
		});
    let wrongans = [
      "That's a wrong answer.",
      "Wrong answer baka!",
      "~~Correct~~ Wrong answer!",
      "Nah, that's not the answer.",
      "Hmm. That's also not the answer."
    ]
    
    let random = wrongans[Math.floor(Math.random() * wrongans.length)];
    let difficult = body.results[0].difficulty;
    let category = body.results[0].category;
    let question = body.results[0].question
		let answer = body.results[0].incorrect_answers;
		answer.push(body.results[0].correct_answer);
    answer = util.shuffle(answer);
		const embed = new MessageEmbed()
    .setTitle(`${msg.author.username}'s trivia`)
		.setColor('RANDOM')
		.setDescription(stripIndents `**${decodeURIComponent(body.results[0].question)}**\n*You have 10 seconds to answer*\n\n` + answer.map((x,i) => `${choices[i]}) *${decodeURIComponent(x)}*`).join('\n'))
		.addField('**__Difficulty__**', `**\`${decodeURIComponent(difficult)}\`**`, true)
    .addField('**__Category__**', `**\`${decodeURIComponent(category)}\`**`, true)
    msg.channel.send(embed);
		const filter = res => choices.includes(res.content) && res.author.id === msg.author.id
		const reply = await msg.channel.awaitMessages(filter, { max: 1, time: 10000 });
		if(!reply.size) return msg.channel.send(`Time has ended! The answer was **${decodeURIComponent(body.results[0].correct_answer)}**`);
		if(answer[choices.indexOf(reply.first().content.toUpperCase())] === body.results[0].correct_answer) return msg.channel.send(`Ayy, You answered it correctly`);
		return msg.channel.send(`${random} The answer was **${decodeURIComponent(body.results[0].correct_answer)}**`);
	}catch(e){
		return msg.channel.send(`Error!\n${e}`);
	}
}

exports.conf = {
    aliases: ['qna'],
    cooldown: "5"
}

exports.help = {
    name: "trivia",
    description: "Try and guess the correct Answer!",
    usage: "trivia"
}