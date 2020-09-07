const { Canvas } = require('canvas-constructor');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  if(message.author.id !== '292936070603997185') return;
	let background1 = client.snek.get("https://i.imgur.com/MlKjm5h.png");
	let overlay1 = client.snek.get("https://i.imgur.com/SDECCJt.png");

	const ping = Date.now();
	const regex = /https?:\/\/.+\.(?:png|jpg|jpeg)/gi;
	if(args.length < 1) return args.missing(message, 'No code provided', this.help);
	const embed = new MessageEmbed();
	let input = `\`\`\`js\n${args.join(' ')}\`\`\``;
	if(input.length > 1024) input = await client.util.hastebin(args.join(' '));
	embed.addField('📥 INPUT', input);
	try{
		const avatar = (await client.snek.get(message.author.displayAvatarURL({format: "png", size: 2048,  dynamic: true}) || client.user.displayAvatarURL({format: "png", size: 2048,  dynamic: true}))).body;
		let code = args.join(' ');
		if(!code.startsWith('new Canvas')) throw new Error('the command cannot execute without new Canvas(high, width)');
		if(!code.includes('.toBufferAsync()')) code += '.toBufferAsync()';
		code.replace(/;/g, '');
		code.replace(regex, async (con)=> {
			const { body } = await client.snek.get(con);
			return body;
		});
		const evaled = await eval(code);
		embed.setColor('#00FF12');
		embed.addField('📤 OUTPUT', '\u200B');
		embed.attachFiles({attachment: evaled, name: 'canvas.png'});
    embed.setImage('attachment://canvas.png');
		embed.setFooter(`⏱️ ${Date.now() - ping}ms`);
		return message.channel.send(embed);
	}catch(e){
		let err = `\`\`\`ini\n${e.message}\`\`\``;
		if(err.length > 1204) err = await client.util.hastebin(e.message);
		embed.setColor('#FF1200');
		embed.addField('⛔ ERROR', err);
		embed.setFooter(`⏱️ ${Date.now() - ping}ms`);
		return message.channel.send(embed);
	}
}

exports.conf = {
  aliases: ['cv'],
  cooldown: '0'
}

exports.help = {
  name: 'canvas',
  description: 'test a canvas-constructor code',
  usage: 'canvas <code>',
}