const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
  try {
    let works = await db.fetch(`works_${message.author.id}`);
    let curwork = 1;
    let Jwork = require('../../../src/work.json');
    let JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];
    let random = Math.floor(Math.random() * 200) + 100;

    db.add(`works_${message.author.id}`, curwork);
    db.add(`currency_${message.author.id}`, random);
      let embed = new MessageEmbed() 
      .setColor(`ff9b38`) 
      .setTitle(`**Work 💼**`)
      .setDescription(`
      **${message.author.username}**, ${JworkR}
      
      *You got paid 🍎 **\`${random}\`** from working for this job!*
      `) 
      .setFooter(`Times Worked » ${works + 1 || `1`} | 2 Minute Cooldown`)
      message.channel.send(embed);
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`);
  }
}

exports.conf = {
    aliases: [],
    cooldown: "120"
}

exports.help = {
    name: "work",
    description: "Do your chores/jobs/whatever. And get some hard earned cash!",
    usage: "work"
}
