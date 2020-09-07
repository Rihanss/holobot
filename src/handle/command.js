const { bot_prefix, embed_color } = require("../config.json");
const { Discord, Collection, MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags")
const cooldownAns = require("./cooldownAns.json");
const cooldowns = new Collection();
const db = require("quick.db");
const timeout = new Set();
const fs = require('fs');

module.exports = async(client, message) => {
    let dxp = await db.fetch(`doublexp_${message.author.id}`);
    let dcash = await db.fetch(`doublecash_${message.author.id}`);
    //let hook = new Discord.WebhookClient("616276846564081717", "Je_fpKH54-ACrD00AFEszwsISFQ2av_LyVnaTrsRCxe5wO5C3so-pVxAku9EUy1wHl_K");
    let channel = client.channels.cache.get("616275210324279316");

    let prefix = message.content.startsWith(bot_prefix) ? bot_prefix : `${client.user.toString()} `;
    let color = embed_color;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    args.missing = argsMissing;

    let blacklist = await client.blacklist.get(message.author.id);
    if(blacklist) {
    let embed = new MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setTitle(`**Holo**`)
    .setDescription(stripIndents `
You are currently banned from Holo.

**Reason:** ${blacklist.reason || "No reason"}
**Banned by:** ${blacklist.author || "No one"}

**Wrongful Ban?**
Please appeal at **[our form.](https://forms.gle/iUYotw9cRBv3zdf39)**
`)
    .setTimestamp()
    .setColor(`RED`)
    message.channel.send(embed).then(r => r.delete(20000));
    } else {
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!commandFile) return;
    if (!cooldowns.has(commandFile.help.name)) {
      cooldowns.set(commandFile.help.name, new Collection());
    };
    const member = message.member;
    const now = Date.now();
    const timestamps = cooldowns.get(commandFile.help.name);
    const cooldownAmount = (commandFile.conf.cooldown || 5) * 1000;
    const opss = cooldownAns[Math.floor(Math.random() * cooldownAns.length)];

    if (!timestamps.has(member.id)) {
      timestamps.set(member.id, now);
    } else {
      const expirationTime = timestamps.get(member.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(`<a:timer:477854358290038784> | **${member.user.username}**, ${opss} (Ratelimited)\n**You'll be able to use this command again in** **${timeLeft.toFixed(1)} seconds.**`).then(msg=>msg.delete(10000));
      };
      timestamps.set(member.id, now);
      setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    };

    try {
      let commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      commands.run(client, message, args, color, prefix);
      if (!commands) return;
    } catch (e) {
      console.error(e)
    } finally {
      console.info(`[${new Date().toString().split(" ", 5).join(" ")}] HoloBot ➣ ${message.author.tag} | ${message.author.id} ran command ${cmd} at ${message.guild.name}`);
  //    hook.send(`[${new Date().toString().split(" ", 5).join(" ")}] HoloBot ➣ ${message.author.tag} | **${message.author.id}** ran command **${cmd}** at ${message.guild.name} | **${message.guild.id}**`)
            
      if (timeout.has(message.author.id)) return;
      let balanceAdd = Math.floor(Math.random() * 20) + 1;
      let dcashadd = Math.floor(Math.random() * 40) + 20;
      let balance = balanceAdd;
          
      if(dcash) {
        db.add(`currency_${message.author.id}`, dcashadd)
      };
        if(!dcash) {
        db.add(`currency_${message.author.id}`, balance) 
      };

      timeout.add(message.author.id);
      setTimeout(() => timeout.delete(message.author.id), 60000); 
      
      if(!db.has(`level_${message.author.id}`)) {
        db.set(`level_${message.author.id}`, { level: 0, xp: 0 })
      } else {
        let amount2xxp = Math.floor(Math.random() * 40) + 1;
        let amountxp = Math.floor(Math.random() * 20) + 1;      
        let xp = await db.fetch(`level_${message.author.id}`)
        let lm = await db.fetch(`levelingmessage_${message.guild.id}`)
      
        let curxp = xp.xp;
        let curlvl = xp.level;
        let nxtLvl = xp.level * 500;
        
        if(dxp) {
          db.add(`level_${message.author.id}.xp`, amount2xxp)
        } else if(!dxp) {
          db.add(`level_${message.author.id}.xp`, amountxp); 
        };
        
        if(nxtLvl <= xp.xp) {
          db.add(`level_${message.author.id}.level`, 1);
          if(lm === 'off') return
          if(lm === null) return
          if(lm === 'on') {
            return message.channel.send(`🆙 | **${message.author.tag}** Leveled up to level \`${curlvl + 1}\``).then(s => s.delete(10000))
          };
        };
      };
    };
  };
  
  function argsMissing(message, res, help){
    const embed = new MessageEmbed()
    .setColor('#FF1000')
    .setTitle('⛔ | **It\'s not how you use** '+ help.name)
    .addField('❓ **Reason**', `\`\`\`${res}\`\`\``)
    .addField('🗒 **Usage**', `\`\`\`${help.usage}\`\`\``)
  //.addField('Example', help.example.map(x => `\`\`\`${x}\`\`\``));
    return message.channel.send(embed);
  };
  };