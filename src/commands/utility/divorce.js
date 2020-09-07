const db = require('quick.db');

exports.run = async(client, message, args, color, prefix) => {

  var user = message.mentions.users.first() || client.users.cache.get(args.join(" ").slice(0))
  if(!user) return message.channel.send('Mention the user you want to divorce with');
  
  let married = await db.fetch(`ProfileMarriage_${message.author.id}`);
  if(!married) return message.channel.send('You aren\'t married.');
  let marrys = await db.fetch(`ProfileMarriage_${user.id}`);
  if(!marrys) return message.channel.send('You aren\'t married with them.');
  let m = await message.reply(`Are you sure you want to divorce with **${user.username}**? Type \`yes\` to confirm or \`no\` to cancel.`) 
  const hit = await client.util.verifyText(message.channel, message.author);
  if(hit) {
    message.channel.send(`You divorced **${user.username}**`) 
    user.send(`**${message.author.username}** decided to divorce you.`)
    db.delete(`marry_${message.author.id}`) 
    db.delete(`marry_${user.id}`)
  } else {
    message.channel.send(`Okay ${message.author}, You are still together with **${user.username}**.`);
  } 
} 

exports.conf = {
  aliases: [], 
  cooldown: '5'
}
exports.help = {
  name: 'divorce', 
  description: 'divorce with someone you already married with', 
  usage: 'divorce <@user>', 
  example: ['divorce @SomeOne'] 
} 