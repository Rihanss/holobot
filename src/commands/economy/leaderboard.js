const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");
const arraySort = require("array-sort");

exports.run = async(client, message, args) => {
// if(message.author.id !== "292936070603997185" && message.author.id !== "341527559382499329") return message.channel.send(`🚫 | Command under maintenance, check back later.`)
  //try {
    let options = args.join(" ").slice(0)
    if(!options) {
      let embed = new MessageEmbed()
      .setTitle(`**Leaderboard**`)
      .setDescription(stripIndents `
      **Balance: \`z-leaderboard apple\`
      Work: \`z-leaderboard work\`
      Fish: \`z-leaderboard fish\`
      Reputation: \`z-leaderboard rep\`**
      `)
      .setColor("RANDOM")
      .setFooter(`Note: Data may be displayed incorrectly in Leaderboards`)
      message.channel.send(embed)
    }
  if(options === "apple") {
  const apple = db.all().filter(data => data.ID.startsWith(`currency`)).sort((a, b) => b.data - a.data);
  let i = 1;
  let content = "  ";
  { apple.length = 10; }

apple.forEach(apples => {
  let user = client.users.cache.find(m => m.id === apples.ID.split('_')[1])
  if(!user) user = "Unknown#0000";
  content += `__**${i++}.**__ **${user.tag || 'User Left the Server'} ➣ 🍎\`${apples.data}\`** \n***ID:** ${apples.ID.split('_')[1]}*\n\n`
})

  const embed = new MessageEmbed()
  .setTitle(`**Apples Leaderboard** 🍎`)
  .setDescription(stripIndents `${content}`)
  .setColor("#39ce41")
  .setFooter(`Note: Leaderboards are Global Statistics`)
  message.channel.send(embed);
} else if(options === 'fish') {
  const fishy = db.all().filter(data => data.ID.startsWith(`fishy`)).sort((a, b) => b.data - a.data);
  let i = 1;
  let content = "  ";
  { fishy.length = 10; }

fishy.forEach(fish => {
  let user = client.users.cache.find(m => m.id === fish.ID.split('_')[1])
  if(!user) user = "Unknown#0000" 
  content += `__**${i++}.**__ **${user.tag || "User Left the Server"} ➣ \`${fish.data}\`** Fish Caught\n***ID:** ${fish.ID.split('_')[1]}*\n\n`;
})
  
  const embed = new MessageEmbed()
  .setTitle(`**Fishing Leaderboard** 🎣`)
  .setDescription(stripIndents `${content}`)
  .setColor("#39ce41")
  .setFooter(`Note: Leaderboards are Global Statistics`)
    message.channel.send(embed);
}  else if(options === 'rep') {
  const rep = db.all().filter(data => data.ID.startsWith(`rep`)).sort((a, b) => b.data - a.data);
  let i = 1;
  let content = "  ";
  { rep.length = 10; }

rep.forEach(rep => {
  let user = client.users.cache.find(m => m.id === rep.ID.split('_')[1])
  if(!user) user = "Unknown#0000"
  content += `__**${i++}.**__ **${user.tag || "User Left the Server"} ➣ \`${rep.data}\`** Reps\n***ID:** ${rep.ID.split('_')[1]}*\n\n`;
})
  const embed = new MessageEmbed()
  .setTitle(`**Rep Leaderboard ✅**`)
  .setDescription(stripIndents `${content}`)
  .setColor("#39ce41")
  .setFooter(`Note: Leaderboards are Global Statistics`)
message.channel.send(embed);

} else if(options === 'work') {
  const works = db.all().filter(data => data.ID.startsWith(`works`)).sort((a, b) => b.data - a.data);
  let i = 1;
  let content = "  ";
  { works.length = 10; }

works.forEach(works => {
  let user = client.users.cache.find(m => m.id === works.ID.split('_')[1])
  if(!user) user = "Unknown#0000"
  content += `__**${i++}.**__ **${user.tag || "User Left the Server"} ➣ \`${works.data}\`** Times\n***ID:** ${works.ID.split('_')[1]}*\n\n`;
})

  const embed = new MessageEmbed()
  .setTitle(`**Work Leaderboard 💼**`)
  .setDescription(stripIndents `${content}`)
  .setColor("#39ce41")
  .setFooter(`Note: Leaderboards are Global Statistics`)
message.channel.send(embed);

} else if(options === 'invite') {
  if(message.author.id !== "292936070603997185" && message.author.id !== "341527559382499329") return message.channel.send(`🚫 | Command under maintenance, check back later.`)
  try {
let invites = await message.guild.fetchInvites().catch(error => { 
    return message.channel.send(`I do not have the **permissions to view Invites!**`);
}) 
  invites = invites.array();
  arraySort(invites, 'uses', { reverse: true }); 
  let possibleinvites = [];
  let index = 0;
  { invites.length = 10; }

invites.forEach(function(invites) {
    possibleinvites.push(`__**${++index}.**__ **${invites.inviter.tag} ➣ \`${invites.uses}\`** Invites\n***ID:** ${invites.inviter.id}*\n`)
})

const embed = new MessageEmbed()
    .setTitle(`**Guild Invite Leaderboard**`)
    .setColor(`RANDOM`)
    .setDescription(stripIndents `${possibleinvites.join('\n')}`)
    .setTimestamp()
message.channel.send(embed);
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``)
  }
}
 // }catch(e) {
 //   message.channel.send(`Error has been occured\n\`${e.message}\``)
 // }

}

exports.conf = {
  aliases: ["lb"],
  cooldown: "3"
}

exports.help = {
  name: "leaderboard",
  description: "View the all time Global Leaderboards on Holo!",
  usage: "leaderboard"
}