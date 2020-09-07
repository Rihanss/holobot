const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'nah', 'nope', 'nop'];

exports.run = async(client, message, args) => {
  try {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) return message.channel.send(`User not found! Please mention someone!`);
    if (user.id == message.author.id) return message.channel.send('You can\'t transfer to yourself!');
    if(user.bot) return message.channel.send(`${message.author.username}, You can't transfer your balance to a bot!`);
    let bal = await db.fetch(`currency_${user.id}`)
    let ball = await db.fetch(`currency_${message.author.id}`);
    if(!args[1]) return args.missing(message, 'You need to specify amount to transfer.', client.commands.get('transfer').help);
    if(isNaN(args[1])) return args.missing(message, 'The amount must be a number', client.commands.get('transfer').help);
    if(args[1].includes("-")) return message.channel.send(`You can't transfer with negative value!`)

    let embed = new MessageEmbed()
    .setTitle(`**Apple transfer 🍎**`)
    .setColor(`#efc381`)
    .setDescription(stripIndents `Are you sure you want to transfer **🍎 ${args[1]}** to ${user.tag}?\n\nType \`yes\` or \`cancel\` to abort this!`)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 2048}))
    if(ball < args[1]) return message.channel.send(`Check again **${message.author.username}**, You dont have \🍎**${args[1]}**`);
    message.channel.send(embed);
    const hit = await verifyText(message.channel, message.author);
    if(hit) {
      db.add(`currency_${user.id}`, args[1]);
      db.subtract(`currency_${message.author.id}`, args[1]);
      message.channel.send(`🍎 ${args[1]} has been deducted from your balance.`);
      user.send(`🏧  | **Transfer Receipt**\`\`\`You have received 🍎 ${args[1]} from user ${message.author.tag}\n(ID: ${message.author.id})\`\`\``);
    } else {
      message.channel.send(`You cancelled the transfer..`);
    }
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`);
  };
};

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
  aliases: ['tf'],
  cooldown: "5"
};

exports.help = {
  name: "transfer",
  description: "Transfer balance to other user",
  usage: "transfer <@user|id> <amount>"
};