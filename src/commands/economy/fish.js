const fishes = require('../../assets/json/fishy');
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
  try {
    let fishTotal = await db.fetch(`fishy_${message.author.id}`);
    const fishID = Math.floor(Math.random() * 10) + 1;
    let rarity;
    if(fishID < 5) rarity = "junk";
    else if(fishID < 8) rarity = "common";
    else if(fishID < 9) rarity = "uncommon";
    else if(fishID < 10) rarity = "rare";
    else rarity = "legendary";
    const fish = fishes[rarity];
    const worth = client.util.randomRange(fish.min, fish.max);
    const result = worth + worth;

    db.add(`fishy_${message.guild.id}`, 1);
    db.add(`currency_${message.author.id}`, result)
    const embed = new MessageEmbed()
    .setColor(`3891ff`) 
    .setTitle(`**Fishing 🎣**`)
    .setDescription(stripIndents `
**${message.author.username}**, You caught ➜ **${fish.symbol}**

*I bet it'll sell for 🍎 **\`${result}\`***
`)
    .setFooter(`Total Caught » ${fishTotal + 1 || `1`} | 30 Second Cooldown`)
    return message.channel.send(embed);
    if(args[0] === 'list' || args[0] === 'reward'){
      let lEmbed = new MessageEmbed() 
      .setColor("RANDOM")
      .setAuthor(`List fish name and reward you can get!`)
      .setDescription(stripIndents, `
  \`\`\`🔧Junk      :: max reward: 5, min reward: 1
  
  🐟Common    :: max reward: 30, min reward: 15
  
  🐠Uncommon  :: max reward: 60, min reward: 20
  
  🦑Rare      :: max reward: 80, min reward: 35
  
  🐋Legendary :: max reward: 120, min reward: 60\`\`\`
  
  **All reward are random from max/min**
  `)
      .setFooter(`Requested by: ${message.author.tag} | ${client.user.username} v${client.version}`)
      message.channel.send(lEmbed);
    }
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
  }
}

exports.conf = {
  aliases: [],
  cooldown: "3"
}

exports.help = {
  name: "fish",
  description: "Fishy fishy",
  usage: "fish [list]"
}