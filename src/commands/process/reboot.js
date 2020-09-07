const Discord = require('discord.js');
const { owners_id } = require('../../config.json');

exports.run = async (client, message, args) => {
  
  owners_id.forEach(async function(owner) {
    if(message.author.id !== owner) return;
     // client.user.setActivity('Restarting the bot for update!')
    client.user.setStatus('idle')

    message.channel.send("**Rebooting...**")
    
    
    .then(message => process.exit())
    .then(() => client.login(process.env.AKARI))
  });
 }

exports.conf = {
   aliases: ['shutdown', 'rb'], 
   cooldown: '' 
}

exports.help = {
  name: 'reboot',
  description: 'This will reboot the bot instance.',
  usage: 'reboot'
};