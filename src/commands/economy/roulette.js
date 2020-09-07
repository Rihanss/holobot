const { bot_prefix } = require("../../config.json");
const db = require("quick.db")

exports.run = async(client, message, args) => {
  try {
    let apples = await db.fetch(`currency_${message.author.id}`);
    let prefix = bot_prefix;
    let colour = args[0];
    let apple = args[1];

    if(!apple) return message.channel.send(`Usage: \`${prefix}roulette <black, red, green> <amount>\`\nPick any of the colours you want... but some are more likely than others...\n**Black is for Even numbers**... **and Red is for odd**... both of these will provide you with **1.5x your original amount**.\nTake a risk and pick **Green** and you can get **14x the amount of money**... however it's one in 37.`);
    if(isNaN(apples)) return message.channel.send(`**${message.author.username}**, Please enter valid number!`);
    if(apple > 500) apple = 500;
    if(apples < apple) return message.channel.send(`**${message.author.username}**, Sorry, you are betting more than you have!`);
    if(!colour)  return message.channel.send(`**${message.author.username}**, You can only bet on Black (1.5x), Red (1.5x), or Green (14x).`);
    colour = colour.toLowerCase();
    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(`**${message.author.username}**, You can only bet on Black (1.5x), Red (1.5x), or Green (14x).`);

    let random = Math.floor(Math.random() * 37);
    if (random == 0 && colour == 2) {
      apple *= 14;
      db.add(`currency_${message.author.id}`, apple);
      message.channel.send(`**${message.author.username}**, 💚 **JACKPOT** You won 🍎 **${apple}** 💚 | The Number was **${random}**`);
    } else if (isOdd(random) && colour == 1) {
      apple = apple * 1.5;
      db.add(`currency_${message.author.id}`, apple);
      message.channel.send(`**${message.author.username}**, 🔴 You won 🍎 **${apple}** 🔴 | The Number was **${random}**`);
    } else if (!isOdd(random) && colour == 0) {
      apple = apple * 1.5;
      db.add(`currency_${message.author.id}`, apple);
      message.channel.send(`**${message.author.username}**, ⚫ You won 🍎 **${apple}** ⚫| The Number was **${random}**`);
    } else { // Lost
      db.subtract(`currency_${message.author.id}`, parseInt(args[1]))
      message.channel.send(`**${message.author.username}**, You sadly lost 🍎 **${apple}** | The Number was **${random}**`);
    };
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``)
  };
};

function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}
exports.conf = {
  aliases: ['rl'],
  cooldown: '10'
};
  
exports.help = {
  name: 'roulette',
  description: 'Allows you to spend your Balance on a game of Roulette.',
  usage: 'roulette <black/red/green> <amount>'
};