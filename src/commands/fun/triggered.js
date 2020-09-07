const Canvas = require('canvas');
const GIFEncoder = require('gifencoder');
const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');

exports.run = async (client, msg, args) => {
	let user = msg.mentions.users.first() || client.users.cache.get(args[1]);
	if(!user) user = msg.author;
		const link = user.displayAvatarURL;
		const { body } = await get(link);
  		const attachment = await getTriggered(body);

  let embed = new MessageEmbed() 
  .setColor(`#f4a564`)
  .setTitle('**Triggered 😡**')
  .setDescription(`**${user.username} is now Triggered Apparently...**`)
	.attachFile({attachment: attachment, name: 'triggered.gif'})
	.setImage('attachment://triggered.gif') 
	return msg.channel.send(embed);
	} 


function streamToArray(stream) {
	if (!stream.readable) return Promise.resolve([]);
	return new Promise((resolve, reject) => {
		const array = [];
		function onData(data) {
			array.push(data);
		}
		function onEnd(error) {
			if (error) reject(error);
			else resolve(array);
			cleanup();
		}
		function onClose() {
			resolve(array);
			cleanup();
		}
		function cleanup() {
			stream.removeListener('data', onData);
			stream.removeListener('end', onEnd);
			stream.removeListener('error', onEnd);
			stream.removeListener('close', onClose);
		}
		stream.on('data', onData);
		stream.on('end', onEnd);
		stream.on('error', onEnd);
		stream.on('close', onClose);
	});
}

async function getTriggered(triggered) {
	const imgTitle = new Canvas.Image();
	const imgTriggered = new Canvas.Image();
	const encoder = new GIFEncoder(256, 256);
	const canvas = new Canvas.createCanvas(256, 256);
	const ctx = canvas.getContext('2d');
  
  imgTitle.src = await get('https://i.imgur.com/HQJ09eD.png').then(x => x.body);
	imgTriggered.src = triggered;
	
	const stream = encoder.createReadStream();
	encoder.start();
	encoder.setRepeat(0);
	encoder.setDelay(50);
	encoder.setQuality(200);
	
	const coord1 = [-25, -33, -42, -14];
	const coord2 = [-25, -13, -34, -10];
	
	for (let i = 0; i < 4; i++) {
		ctx.drawImage(imgTriggered, coord1[i], coord2[i], 300, 300);
		ctx.fillStyle = 'rgba(255 , 100, 0, 0.4)';
		ctx.drawImage(imgTitle, 0, 218, 256, 38);
		ctx.fillRect(0, 0, 256, 256);
		encoder.addFrame(ctx);
	}
	encoder.finish();
	return streamToArray(stream).then(Buffer.concat);
}

exports.conf = {
  aliases: ['trigger'],
}

exports.help = {
  name: 'triggered',
  description: 'Trigger someone...',
  usage: 'triggered [@user|userid]'
}