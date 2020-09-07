const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
  try {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) user = message.author;
    if(user.bot) return;

    let huggedUser = await db.fetch(`huggedUser_${user.id}`);
    let huggedUserBy = await db.fetch(`huggedUsername_${user.id}`);

    let kissedUser = await db.fetch(`kissedUser_${user.id}`);
    let kissedUsernameBy = await db.fetch(`kissedUsername_${user.id}`);

    let marriage = await db.fetch(`marry_${user.id}`);

    let pokedUser = await db.fetch(`pokedUser_${user.id}`);
    let pokedUsernameBy = await db.fetch(`pokedUsername_${user.id}`);

    let lickedUser = await db.fetch(`lickedUser_${user.id}`);
    let lickedUsernameBy = await db.fetch(`lickedUsername_${user.id}`);

    let slappedUser = await db.fetch(`slappedUser_${user.id}`);
    let slappedUsernameBy = await db.fetch(`slappedUsername_${user.id}`);

    let pattedUser = await db.fetch(`pattedUser_${user.id}`);
    let pattedUsernameBy = await db.fetch(`pattedUsername_${user.id}`);

    let nommedUser = await db.fetch(`nommedUser_${user.id}`);
    let nommedUsernameBy = await db.fetch(`nommedUsername_${user.id}`);

    let balance = await db.fetch(`currency_${user.id}`);
    let rep = await db.fetch(`rep_${user.id}`);
    let fish = await db.fetch(`fishy_${user.id}`);
    let work = await db.fetch(`works_${user.id}`);

    if (kissedUser === null) kissedUser = 0;
    if (huggedUser === null) huggedUser = 0;
    if (pokedUser === null) pokedUser = 0;
    if (lickedUser === null) lickedUser = 0;
    if (slappedUser === null) slappedUser = 0;
    if (pattedUser === null) pattedUser = 0;
    if (nommedUser === null) nommedUser = 0;
    if (balance === null) balance = 0;

    let exp = await db.fetch(`level_${user.id}`)
    if(exp === null) {  
      db.set(`level_${user.id}`, { level: 0, xp: 0 })
    }
    let xp = exp.xp
    let uLevel = exp.level
    let nxtLvlXp = uLevel * 680;
    let difference = xp/nxtLvlXp * 345;

    let embed = new MessageEmbed()
    .setTitle(`**${user.username}'s Statistics**`)
    .setDescription(stripIndents `
  **Stats are automatically updated every second**
  ***z-leaderboard** for Leaderboards*
  `)
    .addField(`**Economy Stats**`, `
    💵 **Balance »** $${balance || `0`}
    ✅ **Reps »** ${rep || `0`}
    🎣 **Fishes »** ${fish || `0`}
    💼 **Times Worked »** ${work || `0`}
    
    **Level » \`${uLevel}\`**
    **XP » \`${xp}/${nxtLvlXp}\`**`)
    .addField(`**Love Stats 🏩**`, `
    🤗 Hugged **»** **\`${huggedUser} Times\`** | Hugged by **»** **\`${huggedUserBy || `No One...`}\`**
    💋 Kissed **»** **\`${kissedUser} Times\`** | Kissed by **»** **\`${kissedUsernameBy || `No One...`}\`**
    👉🏻 Poked **»** **\`${pokedUser} Times\`** | Poked by **»** **\`${pokedUsernameBy || `No One...`}\`**
    😇 Patted **»** **\`${pattedUser} Times\`** | Patted by **»** **\`${pattedUsernameBy || `No One...`}\`**
    ✋🏻 Slapped **»** **\`${slappedUser} Times\`** | Slapped by **»** **\`${slappedUsernameBy || `No One...`}\`**
    💒 Married to **»** **\`${marriage ||`Nobody`}\`**`)
    .setThumbnail(user.displayAvatarURL)
    .setColor("RANDOM")
    .setFooter(`These are Global Stats | z-profile or z-level for more stats`)
    message.channel.send(embed)

  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`);
  }
}

exports.conf = {
  aliases: [],
  cooldown: "5"
}

exports.help = {
  name: "userstats",
  description: "Get someone's Economy stats!",
  usage: "userstats <user>"
} 