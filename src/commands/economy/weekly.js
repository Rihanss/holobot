const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const ms = require("parse-ms");
const db = require("quick.db");

exports.run = async(client, message, args) => {
  try {
    let extra = Math.floor(Math.random() * 2000) + 1;
    let streak = await db.fetch(`streakws_${message.author.id}`);
    let cooldown = 6.048e+8;
    let amount = 5000;
    let final = amount + extra;

    let lastWeeklyDaily = await db.fetch(`lastWeeklyDaily_${message.author.id}`)
    if (lastWeeklyDaily !== null && cooldown - (Date.now() - lastWeeklyDaily) > 0) {
      let timeObj = ms(cooldown - (Date.now() - lastWeeklyDaily))
      let cooldownembed = new MessageEmbed()
      .setTitle(`**Weekly 🍎**`)
      .setColor(`#efc381`)
      .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
      .setDescription(stripIndents `
      Seems like you've already redeemed your Weekly Allowance! ✅
      *Come back in **${timeObj.days} Days**, **${timeObj.hours} Hours**, **${timeObj.minutes} Minutes** and **${timeObj.seconds} Seconds***
      
      **Current Streak »** **\`${streak || `1`}\`**
      `)
      .setFooter(`Buy special stuff with z-store | z-leaderboard bal`)
      message.channel.send(cooldownembed);
    } else {
      db.set(`lastWeeklyDaily_${message.author.id}`, Date.now());
      if(streak === 0) {
        db.add(`currency_${message.author.id}`, amount);
        db.add(`streakws_${message.author.id}`, 1);
        let embed = new MessageEmbed()
        .setTitle(`**Weekly 🍎**`)
        .setColor(`#efc381`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(stripIndents `
        Weekly Redeemed **»** **🍎 ${amount}**
        
        **Streak »** **\`1\`** - **B**
        `)
        .setFooter(`Buy special stuff with z-store | z-leaderboard bal`)
        message.channel.send(embed);
      }
      if(streak === 1) {
        db.add(`currency_${message.author.id}`, amount);
        db.add(`streakws_${message.author.id}`, 1);
        let embed = new MessageEmbed()
        .setTitle(`**Weekly 🍎**`)
        .setColor(`#efc381`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(stripIndents `
        Weekly Redeemed **»** **🍎 ${amount}**

        **Streak »** **\`2\`** - **BON**
        `)
        .setFooter(`Don't forget to redeem your Daily Reward! | z-leaderboard bal`)
        message.channel.send(embed);
    }
    if(streak === 2) {
      db.add(`currency_${message.author.id}`, amount);
      db.add(`streakws_${message.author.id}`, 1);
        let embed = new MessageEmbed()
        .setTitle(`**Weekly 🍎**`)
        .setColor(`#efc381`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(stripIndents `
        Weekly Redeemed **»** **🍎 ${amount}**
        
        **Streak »** **\`3\`** - **BONU**
        `)
        .setFooter(`Be kind and Give a Rep to Someone! | z-eaderboard bal`)
        message.channel.send(embed);
      }
      if(streak === 3) {
        db.add(`currency_${message.author.id}`, amount);
        db.set(`streakws_${message.author.id}`, 0);
        let embed = new MessageEmbed()
        .setTitle(`**Weekly 🍎**`)
        .setColor(`#efc381`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(stripIndents `
        Weekly Redeemed **»** **🍎 ${amount}**
    
        You've earned the **BONUS!** *Good Job...*
        An extra **\`$${extra}\`** added for completing your Weekly (3) Streak!
        `)
        .setFooter(`Congrats, now buy stuff with z-store | z-leaderboard bal`)
        message.channel.send(embed);
      } else {
        if(streak === null) {
          db.add(`currency_${message.author.id}`, amount);
          db.set(`streakws_${message.author.id}`, 0);
        };
      };
    };
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`);
  };
};

exports.conf = {
  aliases: [],
  cooldown: "5"
}

exports.help = {
  name: 'weekly',
  description: 'To get your weekly every week',
  usage: 'weekly'
}