const { owners_id } = require('../../../src/config');
const { loadImage } = require('canvas');
const { Canvas } = require('canvas-constructor');
const { get } = require('node-superfetch');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, color) => {
	let user = message.mentions.users.first() || client.users.get(args[1]);
	if(!user) user = message.author;
	if(!args[0]) return args.missing(message, 'You must select from bravery, balance or brilliance', client.commands.get('hypesquad').help);

  if (`${args[0]}` === `bravery` || `${args[0]}` === `Bravery`) {
	const { body: plate } = await get('https://cdn.discordapp.com/attachments/463565370255736832/523410518988292099/Bravery.png');// link gambarnya, yg di storage aja tuu
	const { body: ava } = await get(user.displayAvatarURL.replace(/\.gif/g, '.png'));
	const { width, height } = await loadImage(ava); 
	const attachment = new Canvas(width, height)
	.addImage(ava, 0, 0, width, height)
	.addImage(plate, 0,0, width, height)
	.toBuffer();
	let embed = new RichEmbed() 
	.setColor(color) 
	.setAuthor(`${user.username}`, user.displayAvatarURL)
	.attachFile({attachment: attachment, name: 'bravery.png'})
	.setImage('attachment://bravery.png') 
	return message.channel.send(embed);
	} 
  
  if (`${args[0]}` === `balance` || `${args[0]}` === `Balance`) {
	const { body: plate } = await get('https://cdn.discordapp.com/attachments/463565370255736832/523410526953537536/balance.png');// link gambarnya, yg di storage aja tuu
	const { body: ava } = await get(user.displayAvatarURL.replace(/\.gif/g, '.png'));
	const { width, height } = await loadImage(ava); 
	const attachment = new Canvas(width, height)
  .addImage(ava, 0, 0, width, height)
	.addImage(plate, 0,0, width, height)
	.toBuffer();
	let embed2 = new RichEmbed() 
	.setColor(color) 
	.setAuthor(`${user.username}`, user.displayAvatarURL)
	.attachFile({attachment: attachment, name: 'balance.png'})
	.setImage('attachment://balance.png') 
	return message.channel.send(embed2);
	}
  
  if(`${args[0]}` === `brilliance` || `${args[0]}` === 'Brilliance') {
    const { body: plate } = await get('https://cdn.discordapp.com/attachments/463565370255736832/523410523556020229/brilliance.png')
    	const { body: ava } = await get(user.displayAvatarURL.replace(/\.gif/g, '.png'));
	const { width, height } = await loadImage(ava); 
	const attachment = new Canvas(width, height)
  .addImage(ava, 0, 0, width, height)
	.addImage(plate, 0,0, width, height)
	.toBuffer();
	let embed2 = new RichEmbed() 
	.setColor(color) 
	.setAuthor(`${user.username}`, user.displayAvatarURL)
	.attachFile({attachment: attachment, name: 'brilliance.png'})
	.setImage('attachment://brilliance.png') 
	return message.channel.send(embed2);
}
}

exports.conf = {
	aliases: ['hs'],
	cooldown: '5' 
}

exports.help = {
	name: 'hypesquad',
	description: 'draw your/user avatar hypesquad',
	usage: 'hypesquad <bravery | balance | brilliance> [@user | id]'
}