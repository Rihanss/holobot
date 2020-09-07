const pokemon = require('../../assets/json/pokemon.json');
const { MessageEmbed } = require("discord.js");
const db = require('quick.db'),
        ms = require('parse-ms');

exports.run = async (client, message, args) => { 
    let wrongans = [
      "Incorrect Pokemon!",
      "That's is not the right pokemon baka!",
      "~~Correct~~ Incorrect pokemon.",
      "Woof, that's incorrect...",
      "Hmm. That's also incorrect..."
    ]

let random = wrongans[Math.floor(Math.random() * wrongans.length)];
  const rand = Math.floor(Math.random() * 807);
    const poke = rand > 0 ? rand : Math.floor(Math.random() * 807);
    const pokem = pokemon[poke];
  const user = message.author;
  
  let bembed = new MessageEmbed()
  .setDescription("**» Guess this pokemon! «**")
  .setImage(pokem.imageURL)
  .setColor(`#eadb8f`)
  .setFooter(`${message.author.username} has 30 Seconds to Answer!`, `${user.displayAvatarURL}`)     
  
  const msg = await message.channel.send(bembed);
  const filter = m => m.author.id === message.author.id;
  const attempts = await msg.channel.awaitMessages(filter, { time: 30000, max: 1 });
  console.log(`${message.author.tag} Pokemon = ${pokem.name}`)
  
  if (!attempts || !attempts.size) {
    msg.delete();
    return message.channel.send(`You've ran out of the time! The answer was **${pokem.name}**`)
  } 
  
  const answer = attempts.first().content.toLowerCase();  
  
  if (answer === pokem.name.toLowerCase()) {
    return message.channel.send(`Congratulations! You answered the right pokemon! It was **${pokem.name}**`)
  }
  return message.channel.send(`${random} The correct pokemon was **${pokem.name}**`)
    //return msg.channel.send(`**Pokémon |** **Incorrect Pokémon!** 😭\n\nThe Correct Answer was **\`${pokem.name}\`**`);
  } 
 
exports.conf = {
  aliases: ["pokmon", "guessthatpokemon"],
  cooldown: "7"
};

exports.help = {
  name: "pokemon",
  description: "Guess That Pokemon",
  usage: "pokemon <pokemonname>"
};
