const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'nah', 'nope', 'nop'];

exports.run = async(client, message, args) => {
  try {
    const currency = await db.fetch(`currency_${message.author.id}`);
    const vault = await db.fetch(`vault_${message.author.id}`);
    const bankcurrency = await db.fetch(`bankcurrency_${message.author.id}`);

    let options = args[0]
    let final = args.slice(1).join(" ");
      if(!options && !vault) {
        const embed = new MessageEmbed()
        .setDescription(stripIndents `
        Welcome to the bank of Apples!

        You can deposit or withdraw your apples here. Please make sure you have Vault keycard to access it.

        <:declined:536851930790625291> You don't have access. Please buy it from store.
        `)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setColor(`RED`)
        message.channel.send(embed);
      } else {
        if(!options && vault) {
          const embed = new MessageEmbed()
          .setDescription(stripIndents `
          Welcome to the bank of Apples!

          You can deposit or Withdraw your apples here. Please make sure you have Vault keycard to access it.

          <:accepted:536851930714996737> You have access.
          Please use \`z-bank <deposit / withdraw> <amount || all>\` to start depositing or withdrawn the apples.
          `)
          .addField(`**Information**`, `
          You have \`${bankcurrency || "0"}\` 🍎 inside your bank vault.
          You have \`${currency || "0"}\` 🍎 inside your dimension pocket.
          `)
          .setColor(`GREEN`)
          .setThumbnail(message.author.displayAvatarULR({ dynamic: true }))
        }
      }
      if(options === "deposit") {
        if(!final) return message.channel.send(`Please input a number to deposit!`)
        if(final > currency) return message.channel.send(`You cannot deposit more than what you have in your wallet!`)
  
        if(final === "all") {
          db.subtract(`currency_${message.author.id}`, currency)
          db.add(`bankcurrency_${message.author.id}`, currency)
          message.channel.send(`Successfully deposited \`${currency || "0"}\` 🍎 to the bank vault.`)
        } else {
          if(isNaN(final)) return message.channel.send(`Please input a number to deposit!`)
          db.subtract(`currency_${message.author.id}`, final)
          db.add(`bankcurrency_${message.author.id}`, final)
          message.channel.send(`Successfully deposited \`${final}\` 🍎 to the bank vault.`)
        }
        
      } else {
        if(options === "withdraw") {
          if(!final) return message.channel.send(`Please input a number to withdraw!`)
          if(final > bankcurrency) return message.channel.send(`You cannot withdraw more than you have inside your bank vault!`)
          if(final === "all") {
            db.subtract(`bankcurrency_${message.author.id}`, bankcurrency)
            db.add(`currency_${message.author.id}`, bankcurrency)
            message.channel.send(`Successfully withdraw \`${bankcurrency || "0"}\` 🍎 from the bank vault.`)
          } else {
          if(isNaN(final)) return message.channel.send(`Please input a number to deposit!`)
            db.subtract(`bankcurrency_${message.author.id}`, final)
            db.add(`currency_${message.author.id}`, final)
            message.channel.send(`Successfully withdraw \`${final}\` 🍎 from the bank vault.`)
          }
        }
      }
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`)
  }
}

exports.conf = {
  aliases: [],
  cooldown: "0"
}

exports.help = {
  name: "bank",
  description: "Protect your money from robbery!",
  usage: "bank <deposit | withdraw> <amount>"
}