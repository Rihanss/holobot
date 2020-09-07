const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'nah', 'nope', 'nop'];

exports.run = async(client, message, args, color) => {
  try {
    const bal = await db.fetch(`currency_${message.author.id}`);
    const profilebg = await db.fetch(`background_${message.author.id}`);
    let amount = 300;

    if(bal < amount) return message.channel.send(`**Insufficient Apple...** You need **$${amount}** to change your Custom Profile Background\n\n*Keep on being active and don't forget to redeem your Daily, Weekly and Rep Rewards!*`) 
    let backgroundlink = args[0];
    if(!backgroundlink) return message.channel.send("You must specify a Profile Background Image Link!\n\n**Be sure all Background Links either end in either \`.jpg | .png | .gif\`**")
  
    let embed = new MessageEmbed()
    .setColor('45a2d8')
    .setTitle('**Profile Background 🖼**')
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setImage(backgroundlink)
    .setDescription(stripIndents `You're about to apply this Custom Profile Background\n*This background, shown here in this preview will show on your profile **once applied***\n\n**Cost » \`🍎 ${amount}\`**`)
    .setFooter('Reply with Yes or No to confirm | Action Irreversible! 🚫')
      
    message.channel.send(embed)
  const hit = await verifyText(message.channel, message.author)
  if(hit) {
  db.subtract(`currency_${message.author.id}`, amount)
  db.set(`background_${message.author.id}`, backgroundlink)
  message.channel.send('Please Wait, Custom Profile Background is now applying...').then(msg => {msg.delete(500)});

  let bgEmbed = new MessageEmbed() 
  .setColor('445cd6')
  .setTitle('**Profile Background 🖼**')
  .setThumbnail(backgroundlink)
  .setDescription(stripIndents `**Custom Profile Background Applied! 🛍**\n\n**🍎 ${amount}** has been deducted from your balance!`) 
  .setFooter('To check your new background, run z-profile')
  message.channel.send(bgEmbed)  
  }
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
  }
}

async function verifyText(channel, user, time = 30000) {
  const filter = res => {
    const value = res.content.toLowerCase();
    return res.author.id === user.id && (yes.includes(value) || no.includes(value));
  };
  const verify = await channel.awaitMessages(filter, {
    max: 1,
    time
  });
  if (!verify.size) return 0;
  const choice = verify.first().content.toLowerCase();
  if (yes.includes(choice)) return true;
  if (no.includes(choice)) return false;
  return false;
}

exports.conf = {
  aliases: ['bg'],
  cooldown: "10"
}

exports.help = {
  name: "background",
  description: "Set the Background for your Profile and Level!",
  usage: "background <picture>"
}