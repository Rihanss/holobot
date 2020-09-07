const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async(client, message, args) => {
  try {
    let extra = Math.floor(Math.random() * 400) + 1;
    let cooldown = 8.64e+7;
    let amount = 250;
    let total = amount + extra;
    const streak = await db.fetch(`streak_${message.author.id}`);
    const lastDaily = await db.fetch(`lastDaily_${message.author.id}`);

if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
  let timeObj = ms(cooldown - (Date.now() - lastDaily))
  let cooldownembed = new MessageEmbed()
  .setTitle(`**🍎 Apples**`)
  .setColor(`#efc381`)
  .setThumbnail(message.author.displayAvatarURL({dyanmic: true}))
  .setDescription(stripIndents `
Seems like you've already redeemed your Daily Allowance! ✅
*Come back in **${timeObj.hours} Hours**, **${timeObj.minutes} Minutes** and **${timeObj.seconds} Seconds***

**Current Streak »** **\`${streak || `1`}\`**
`)
  .setFooter(`Buy special stuff with z-store | z-leaderboard bal`)
  message.channel.send(cooldownembed)
} else {
  db.set(`lastDaily_${message.author.id}`, Date.now());

if(streak === 0) {
  db.add(`currency_${message.author.id}`, amount)
  let embed = new MessageEmbed()
  .setTitle(`**🍎 Apples**`)
  .setColor(`#efc381`)
  .setThumbnail(message.author.displayAvatarURL({dyanmic: true}))
  .setDescription(stripIndents `
Apple Daily Redeemed **»** **🍎${amount}**

**Streak »** **\`1\`** - **B**
`)
  .setFooter(`Buy special stuff with z-store | z-leaderboard bal`)
  
  message.channel.send(embed);
    
  db.add(`streak_${message.author.id}`, 1)
}
if(streak === 1) {
  db.add(`currency_${message.author.id}`, amount)
  let embed = new MessageEmbed()
  .setTitle(`**🍎 Apples**`)
  .setColor(`#efc381`)
  .setThumbnail(message.author.displayAvatarURL({dyanmic: true}))
  .setDescription(stripIndents `
Apple Daily Redeemed **»** **🍎${amount}**

**Streak »** **\`2\`** - **BO**
`)
  .setFooter(`Don't forget to redeem your Weekly Reward! | z-leaderboard bal`)

  message.channel.send(embed);
  
  db.add(`streak_${message.author.id}`, 1)
}
if(streak === 2) {
  db.add(`currency_${message.author.id}`, amount)
  let embed = new MessageEmbed()
  .setTitle(`**🍎 Apples**`)
  .setColor(`#efc381`)
  .setThumbnail(message.author.displayAvatarURL({dyanmic: true}))
  .setDescription(stripIndents `
Apple Daily Redeemed **»** **🍎${amount}**

**Streak »** **\`3\`** - **BON**
`)
  .setFooter(`Be kind and Give a Rep to Someone! | z-leaderboard bal`)

  message.channel.send(embed);
  
  db.add(`streak_${message.author.id}`, 1)
}
if(streak === 3) {
  db.add(`currency_${message.author.id}`, amount)  
  let embed = new MessageEmbed()
  .setTitle(`**🍎 Apples**`)
  .setColor(`#efc381`)
  .setThumbnail(message.author.displayAvatarURL({dyanmic: true}))
  .setDescription(stripIndents `
Apple Daily Redeemed **»** **🍎${amount}**

**Streak »** **\`4\`** - **BONU**
`)
  .setFooter(`Want more Apple? Play some games by running z-help | z-leaderboard bal`)

  message.channel.send(embed);
  
  db.add(`streak_${message.author.id}`, 1)
}
if(streak === 4) {
  db.add(`currency_${message.author.id}`, amount)  
  let embed = new MessageEmbed()
  .setTitle(`**🍎 Apples**`)
  .setColor(`#efc381`)
  .setThumbnail(message.author.displayAvatarURL({dyanmic: true}))
  .setDescription(stripIndents `
Daily Redeemed **»** **🍎${amount}**

You've earned the **BONUS!** *Good Job...*
An extra **\`🍎${extra}\`** added for completing your Daily (5) Streak!
`)
  .setFooter(`Congrats, now buy stuff with z-store | z-leaderboard apples`)
  message.channel.send(embed);
  
  db.set(`streak_${message.author.id}`, 0)
} else {
  if(streak === null) {
    db.add(`currency_${message.author.id}`, amount)
    db.set(`streak_${message.author.id}`, 0)
  }
}
  }
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
  }
}

exports.conf = {
  aliases: ["daily"],
  cooldown: "3"
}

exports.help = {
  name: 'dailies',
  description: 'Claim your Daily Reward every 24 Hours!',
  usage: 'dailies | daily'
}