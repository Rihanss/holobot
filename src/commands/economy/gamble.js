const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

exports.run = async(client, message, args) => {
  try {
    const apples = await db.fetch(`currency_${message.author.id}`);
    let apple = args[0];
    let random = Math.floor(Math.random() * 37);
    if(!apple) return args.missing(message, "You need to specify how many apple you want to gamble :/", client.commands.get("gamble").help);
    if(isNaN(apple)) return message.channel.send(`Please write it with number not with text or nothing else`);
    if(apple > 500) apple = 500;
    if(apples < apple) return message.channel.send(`You don't have enough apple in your storage to gamble than what you want, that's make me sad.`);

    if (random == 0) { // Jackpot
      money *= 10
    db.add(`currency_${message.author.id}`, money)
      message.channel.send(`🎲 | **${message.author}**, 🎉🎉 **JACKPOT** You won 🍎 **${money}** 🎉🎉 Wow Congrats 🎉`);
  } else if (random == 5) { // win
      money = money * 2.50
    db.add(`currency_${message.author.id}`, money)
      message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 🍎 **${money}** 🎉 and got keep what you had.`);
  } else if (random == 10) { // win
      money = money * 2.50
    db.add(`currency_${message.author.id}`, money)
      message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 🍎 **${money}** 🎉 and got keep what you had.`);
  } else if (random == 15) { // Win
      money = money * 2.50
    db.add(`currency_${message.author.id}`, money)
      message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 🍎 **${money}** 🎉 and got keep what you had.`);
  } else if (random == 20) { // win
      money = money * 2.50
      db.add(`currency_${message.author.id}`, money)
      message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 🍎 **${money}** 🎉 and got keep what you had.`);
} else if (random == 25) { // Win
      money = money * 2.50
db.add(`currency_${message.author.id}`, money)
      message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 🍎 **${money}** 🎉 and got keep what you had.`);
  } else if (random == 30) { // Win
      money = money * 2.50
db.add(`currency_${message.author.id}`, money)
      message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 🍎 **${money}** 🎉 and got keep what you had.`);

  } else { // Lost
      db.subtract(`currency_${message.author.id}`, money)
      message.channel.send(`🎲 | **${message.author.username}**, You sadly lost 🍎 **${money}**, I hope you do better next time 😦`);
    }
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``)
  }
}

exports.conf = {
  aliases: ['gambling'],
  cooldown: '10'
};
  
exports.help = {
  name: 'gamble',
  description: 'Allows you to gamble your appleeee. Apple ayaya',
  usage: 'gamble <amount>'
};