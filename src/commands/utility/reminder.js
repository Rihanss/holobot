exports.run = async (client, message, args, color) => { // eslint-disable-line no-unused-vars
	var time = args[0];
	var reminder = args.splice(1).join(' ');

	if (!time) return message.channel.send(`⚠ | **${message.author.username}**, please specify a time`);
	if (!reminder) return message.channel.send(`⚠ | **${message.author.username}**, Please specify a text to remind`);

	time = await time.toString();

	if (time.indexOf('s') !== -1) { // Detik 
		var timesec = await time.replace(/s.*/, '');
		var timems = await timesec * 1000;
	} else if (time.indexOf('m') !== -1) { // Menit
		var timemin = await time.replace(/m.*/, '');
		timems = await timemin * 60 * 1000;
	} else if (time.indexOf('h') !== -1) { // Jam
		var timehour = await time.replace(/h.*/, '');
		timems = await timehour * 60 * 60 * 1000;
	} else if (time.indexOf('d') !== -1) { // Hari
		var timeday = await time.replace(/d.*/, '');
		timems = await timeday * 60 * 60 * 24 * 1000;
	}	else {
    return message.channel.send(`Available Format: \`<number>[s/m/h/d]\``)
		//return message.channel.send('Reminder Format: \`<number>[s/m/h/d]\`');
	}
 message.channel.send(`⏰ | **Alright, i will remind you in** \`${time}\`, **about:** \`${reminder}\`\nPlease make sure your DM are open so the bot can send message to your DM`)

	setTimeout(function () {
    message.author.send(`⏰ **Reminder:** ${reminder}`).catch(err => console.log(`Error has been occured!\n${err}`))
	}, parseInt(timems));

};

exports.conf = {
  aliases: ['remindme'], 
  cooldown: '3'
} 
exports.help = {
  name: 'reminder', 
  description: 'Remind you for specific time', 
  usage: 'reminder <number>[s/m/h/d]'  
}