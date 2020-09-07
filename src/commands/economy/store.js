const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require('quick.db')
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'nah', 'nope', 'nop'];

exports.run = async(client, message, args) => {
  try {
    let options = args.join(" ").slice(0);
    let currency = await db.fetch(`currency_${message.author.id}`);
    let dxp = await db.fetch(`doublexp_${message.author.id}`);
    let dcash = await db.fetch(`doublecash_${message.author.id}`);
    let vault = await db.fetch(`vault_${message.author.id}`);

    let badge1 = "https://cdn.discordapp.com/attachments/528192146080268328/651657181703438367/holochibi.png";
    let badge2 = "https://cdn.discordapp.com/attachments/528192146080268328/634715370606821396/pumpkin-trans.png";
    let badge3 = "https://cdn.discordapp.com/attachments/528192146080268328/634721497713475595/sans-circle.png";
    let badge4 = "https://cdn.discordapp.com/attachments/528192146080268328/651656059102167041/badge-tetris.png";
    let badge5 = "https://cdn.discordapp.com/attachments/596555821106724875/612557237684142090/ets2.png";
    let badge6 = "https://cdn.discordapp.com/attachments/528192146080268328/651657248069648384/Christmas-Tree-512.png";

    if(!options) {
      let embed = new MessageEmbed()
      .setTitle(`**Holo Apple Store**`)
      .setDescription(stripIndents `
      Here you can exchange your Apples with amazing stuff available here, you can buy anything listed here with a certain amount. After you purchased, it will be added automatically!
      
      To sell **__Power-Ups__** by doing **\`z-store sell <item>\`**\nExample: **\`z-store sell 2xxp\`**
      `)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(`RANDOM`)
      .addField(`**__Power-ups__**`, stripIndents`
      **\`2x XP (30k)\`** » z-store buy 2xxp
      **\`2x Money (50k)\`** » z-store buy 2xcash
      `)
      .addField(`**__Items__**`, stripIndents `**\`Vault access (20k)\`** » z-store buy vault`)
      .addField(`**__Badges__**`, stripIndents `
      **\`Holo Badge [Slot 1]\`** » z-store buy \`holobadge\`
      **\`Pumpkin Badge [Slot 2]\`** » z-store buy \`pumpkinbadge\`
      **\`Sans Badge [Slot 3]\`** » z-store buy \`sansbadge\`
      **\`Tetris Badge [Slot 4]\`** » z-store buy \`tetrisbadge\`
      **\`ETS2 Badge [Slot 5]\`** » z-store buy \`ets2badge\`
      **\`Christmas tree Badge [Slot 6]\`**  » z-store buy \`christmastreebadge\`
      `)
      .setImage("https://cdn.discordapp.com/attachments/709427102642077786/713798807501930566/nitro.gif")
      message.channel.send(embed)
    } 

    if(options === "buy 2xxp") {
      if(dxp) return message.channel.send(`You already have double xp, why you need another one?`);
      if(currency < 30000) return message.channel.send(`You don't have enough 🍎 Apples to buy 2x xp`);
      message.channel.send(`Are you sure you want to buy **2x xp**? This action can't be undone!`);
      const hit = await verifyText(message.channel, message.author);
      if(hit) {
      db.subtract(`currency_${message.author.id}`, 30000);
      db.set(`doublexp_${message.author.id}`, "https://cdn.discordapp.com/attachments/596555821106724875/611885914636943369/2x-png-7.png");
      return message.channel.send(`You bought **2x XP** for 30k 🍎 Apples.`);
    } else {
      message.channel.send(`**Cancelled...**`);
    };
  };
  if(options === "buy 2xcash") {
      if(dcash) return message.channel.send(`You already have double 🍎 Apples, why you need another one?`)
      if(currency < 50000) return message.channel.send(`You don't have enough 🍎 Apples to buy 2x xp`)
      message.channel.send(`Are you sure you want to buy **2x apples**? This action can't be undone!`)
      const hit = await verifyText(message.channel, message.author)
      if(hit) {
      db.subtract(`currency_${message.author.id}`, 50000)
      db.set(`doublecash_${message.author.id}`, "https://cdn.discordapp.com/attachments/596555821106724875/611879808007405608/0be28376c6508243699229e42bd6a9d3.png")
      return message.channel.send(`You bought **2x Apples** for 50k 🍎 Apples.`)
    } else {
      message.channel.send(`**Cancelled...**`);
    };
  };
    if(options === "buy vault") {
      if(vault) return message.channel.send(`Only 1 Bank access card you can have.`);
      if(currency < 20000) return message.channel.send(`You don't have enough 🍎 Apples to buy vault access!`);
      message.channel.send(`Are you sure you want to buy **Vault access**? This action cannot be undone!`);
      const hit = await verifyText(message.channel, message.author);
      if(hit) {
      db.subtract(`currency_${message.author.id}`, 20000);
      db.set(`vault_${message.author.id}`, `vaultaccess`);
      return message.channel.send(`You bought **Vault access** for 20k 🍎 Apples. `);
    } else {
      message.channel.send(`**Cancelled...**`);
    };
  };
    if(options === "buy holobadge") { // Badge slot 1
      if(currency < 1501) return message.channel.send(`You don't have enough 🍎 to buy Holo Badge`);
      message.channel.send(`Are you sure you want to buy **Holo badge**? Your previous badge will be replaced...`);
      let embed = new RichEmbed()
      .setTitle(`Image Preview`)
      .setColor('GREEN')
      .setImage(badge1)
      .setFooter(`Type "yes" to accept and "no" to decline`)
      message.channel.send(embed);
      const hit = await verifyText(message.channel, message.author);
      if(hit) {
      db.subtract(`currency_${message.author.id}`, 1500);
      db.set(`badge1_${message.author.id}`, badge1);
      return message.channel.send(`You bought **Holo Badge** for 1,5k 🍎 Apples.`);
    } else {
      message.channel.send(`**Cancelled...**`);
    };
  };
    if(options === "buy pumpkinbadge") { // badge slot 2
      if(currency < 1501) return message.channel.send(`You don't have enough 🍎 to buy Pumpkin Badge`);
      message.channel.send(`Are you sure you want to buy **Pumpkin Badge**? Your previous badge will be replaced...`);
      let embed = new RichEmbed()
      .setTitle(`Image Preview`)
      .setColor('GREEN')
      .setImage(badge2)
      .setFooter(`Type "yes" to accept and "no" to decline`)
      message.channel.send(embed);
      const hit = await verifyText(message.channel, message.author);
      if(hit) {
      db.subtract(`currency_${message.author.id}`, 1500)
      db.set(`badge2_${message.author.id}`, badge2)
      return message.channel.send(`You bought **Pumpkin Badge** for 1,5k 🍎 Apples.`)
    } else {
      message.channel.send(`**Cancelled...**`)
    };
  };
    if(options === "buy sansbadge") { // Badge slot 3
      if(currency < 1501) return message.channel.send(`You don't have enough 🍎 to buy Sans Badge`)
      message.channel.send(`Are you sure you want to buy **Sans Badge**? Your previous badge will be replaced...`)
      let embed = new RichEmbed()
      .setTitle(`Image Preview`)
      .setColor('GREEN')
      .setImage(badge3)
      .setFooter(`Type "yes" to accept and "no" to decline`)
      message.channel.send(embed)
      const hit = await verifyText(message.channel, message.author)
      if(hit) {
      db.subtract(`currency_${message.author.id}`, 1500)
      db.set(`badge3_${message.author.id}`, badge3)
      return message.channel.send(`You bought **Sans Badge** for 1,5k 🍎 Apples.`)
    } else {
        message.channel.send(`**Cancelled...**`)
      };
    };
    if(options === "buy tetrisbadge") { // badge slot 4
      if(currency < 1501) return message.channel.send(`You don't have enough 🍎 to buy Tetris Badge`)
      message.channel.send(`Are you sure you want to buy **Tetris Badge**? Your previous badge will be replaced...`)
      let embed = new RichEmbed()
      .setTitle(`Image Preview`)
      .setColor('GREEN')
      .setImage(badge4)
      .setFooter(`Type "yes" to accept and "no" to decline`)
      message.channel.send(embed)
      const hit = await verifyText(message.channel, message.author)
      if(hit) {
      db.subtract(`currency_${message.author.id}`, 1500)
      db.set(`badge4_${message.author.id}`, badge4)
      return message.channel.send(`You bought **Tetris Badge** for 1,5k 🍎 Apples.`)
    } else {
      message.channel.send(`**Cancelled...**`)
    };
  };
    if(options === "buy ets2badge") { // badge slot 5
      if(currency < 1501) return message.channel.send(`You don't have enough 🍎 to buy Euro Truck Simulator 2 Badge`);
      message.channel.send(`Are you sure you want to buy **Euro Truck Simulator 2 Badge**? Your previous badge will be replaced...`)
      let embed = new RichEmbed()
      .setTitle(`Image Preview`)
      .setColor('GREEN')
      .setImage(badge5)
      .setFooter(`Type "yes" to accept and "no" to decline`)
      message.channel.send(embed);
      const hit = await verifyText(message.channel, message.author);
      if(hit) {
      db.subtract(`currency_${message.author.id}`, 1500);
      db.set(`badge5_${message.author.id}`, badge5);
      return message.channel.send(`You bought **Euro Truck Simulator 2 Badge** for 1,5k 🍎 Apples.`);
    } else {
        message.channel.send(`**Cancelled...**`);
    };
  };
    if(options === "buy christmastreebadge") { // badge slot 6
      if(currency < 1501) return message.channel.send(`You don't have enough 🍎 to buy Christmas tree badge Badge`);
      message.channel.send(`Are you sure you want to buy **Christmas Tree Badge**? Your previous badge will be replaced...`);
      let embed = new RichEmbed()
      .setTitle(`Image Preview`)
      .setColor('GREEN')
      .setImage(badge6)
      .setFooter(`Type "yes" to accept and "no" to decline`)
      message.channel.send(embed);
      const hit = await verifyText(message.channel, message.author);
      if(hit) {
      db.subtract(`currency_${message.author.id}`, 1500);
      db.set(`badge6_${message.author.id}`, badge6);
      return message.channel.send(`You bought **Christmas Tree Badge** for 1,5k 🍎 Apples.`);
      } else {
        message.channel.send(`**Cancelled...**`);
      };
    };
    if(options === "sell 2xxp") {
      if(!dxp) return message.channel.send(`Sorry, you don't have 2x xp`);
      message.channel.send(`Are you sure you want to sell **2x xp**? You will be refunded 50% of the item price.`);
      const hit = await verifyText(message.channel, message.author);
      if(hit) {
        db.add(`currency_${message.author.id}`, 15000);
        db.delete(`doublexp_${message.author.id}`);
        return message.channel.send(`You sold **2x xp** and gained 15k 🍎 Apples back.`);
      } else {
        message.channel.send(`**Cancelled...**`);
      }
    }
    if(options === "sell 2xcash") {
      if(!dcash) return message.channel.send(`Sorry, you don't have 2x Apples`);
      message.channel.send(`Are you sure you want to sell **2x cash**? You will be refunded 50% of the item price.`);
      const hit = await verifyText(message.channel, message.author);
      if(hit) {
        db.add(`currency_${message.author.id}`, 25000);
        db.delete(`doublecash_${message.author.id}`);
        return message.channel.send(`You sold **2x cash** and gained 25k 🍎 Apples back.`);
      } else {
        message.channel.send(`**Cancelled...**`);
      };
    };
  }catch(e) {
    message.channel.send(`Error has been occured!\n\`${e.message}\``)
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
};

exports.conf = {
aliases: ["shop"],
cooldown: "5"
};

exports.help = {
name: "store",
description: "Buy stuff from Holo's shop!",
usage: "store <buy | sell> <item>"
};