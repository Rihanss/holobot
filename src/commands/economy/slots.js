const db = require('quick.db')

exports.run = async (client, message, args, color) => {
  let bal = db.fetch(`currency_${message.author.id}`)
  
  let slots = ['🍇', '🍐', '🍒', '🍋', '🍊', '🥑', '🍉']
  const { shuffle } = client.util  
  let amount = (args[0]);
  
    if (!amount) amount = 2;
    if (isNaN(amount)) return message.channel.send(`**${message.author.username}**, Please enter valid number!`);
    if (amount > 500) amount = 500;
  
     let random = 5 * amount;

    if(bal < amount) return message.channel.send(`**${message.author.username}**, You not have insufficient Apples yet, Keep active and don't forget to take your daily everyday!`);
  
      const arr1 = shuffle(slots);
      const arr2 = shuffle(slots);
      const arr3 = shuffle(slots);
      const thisMes = await message.channel.send(`
**[ 🎰 | SLOTS ]**
**-----------------**
${arr1[2]} : ${arr2[0]} : ${arr3[2]}

${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**

${arr1[0]} : ${arr2[2]} : ${arr3[0]}
**-----------------**
`);

    for(let i = 0; i < 5; i++){
  	arr1.push(arr1.shift());
	  arr2.push(arr2.shift());
   	arr3.push(arr3.shift());
    
    await setTimeout(() => thisMes.edit(`
**[ 🎰 | SLOTS ]**
**-----------------**
${arr1[0]} : ${arr2[1]} : ${arr3[0]}

${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**

${arr1[0]} : ${arr2[2]} : ${arr3[0]}
**-----------------**
	`), 800)
    
  setTimeout(() => thisMes.edit(`
**[ 🎰 | SLOTS ]**
**-----------------**
${arr1[2]} : ${arr2[1]} : ${arr3[2]}

${arr1[0]} : ${arr2[1]} : ${arr3[2]} **«**

${arr1[2]} : ${arr2[0]} : ${arr3[1]}
**-----------------**
	`), 1300);
    
	  if(arr1[1] === arr2[1] && arr1[1] === arr3[1] || arr1[1] && arr2[1] === arr1[1] && arr3[1] || arr2[1] === arr1[1] && arr2[1] === arr3[1] || arr3[1] === arr2[1] && arr3[1] === arr1[1] || arr3[1] && arr2[1] === arr3[1] && arr1[1] || arr1[1] === arr3[1] && arr3[1] && arr2[1] ) {
      db.add(`currency_${message.author.id}`, random)
    return setTimeout(() => thisMes.edit(`
**[ 🎰 | SLOTS ]**
**-----------------**
${arr1[2]} : ${arr2[0]} : ${arr3[2]}

${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**

${arr1[0]} : ${arr2[2]} : ${arr3[0]}
**-----------------**
| : : : **WIN** : : : |

**${message.author.username}** used **🍎 ${amount}** and won **🍎 ${random}**
	`), 2300);
  }
      db.subtract(`currency_${message.author.id}`, amount)
    
	    return setTimeout(() => thisMes.edit(`
**[ 🎰 | SLOTS ]**
**-----------------**
${arr1[2]} : ${arr2[0]} : ${arr3[2]}

${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**

${arr1[0]} : ${arr2[2]} : ${arr3[0]}
**-----------------**
| : : : **LOST** : : : |

**${message.author.username}** used 🍎 **${amount}** and lost everything.
	`),2300)
  }

}

exports.conf = {
    aliases: ['slot', 'sl'],
    cooldown: "15"
}

exports.help = {
    name: "slots",
    description: "Play the slot machine",
    usage: "slots [amount]"
}