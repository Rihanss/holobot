const discord = require("discord.js")
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
 
  
if (message.author.id !== '341527559382499329' && message.author.id !== '346662217510551552' && message.author.id !== '292936070603997185') return message.channel.send('**NateBot |** Illegal Command')

    var item = "";
    var time;
    var winnerCount;
 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**Giveaway 🎉 |** Unable to Start Giveaway!\n\nYou must have the **\`MANAGE_MESSAGES\`** permission on the server.");
 
    // !giveaway numberofwinners time prize.
 
    winnerCount = args[0];
    if(!winnerCount) return message.channel.send(`**Giveaway 🎉 |** You must specify the number of winners!\n\n**Example » \`2\`**`)
    time = args[1];
      if(!time) return message.channel.send(`**Giveaway 🎉 |** You must specify the Giveaway End Time **(in seconds)** for this Giveaway!\n\n**Example » \`10\`** `)
    item = args.splice(2, args.length).join(' ');
       if(!item) return message.channel.send(`**Giveaway 🎉 |** You must specify the Prize for this Giveaway!\n\n**Example » \`HiveMC Ultimate\`**`)

    message.delete();
 
    var date = new Date().getTime();
    var dateTime = new Date(date + (time * 1000));
 
    var giveawayEmbed = new discord.RichEmbed()
        .setTitle("**Giveaway** 🎉")
        .setColor(`#7289da`)
        .setDescription(`**\`${item}\`**\n**Click 🎉 Reaction to Enter!** | **${winnerCount}** Winner(s)`)
        .setFooter(`Ends » ${moment(dateTime).format('MMMM Do YYYY, h:mm:ss a')}`)

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");
 
    setTimeout(function () {
 
        var random = 0;
        var winners = [];
        var inList = false;
 
        var peopleReacted = embedSend.reactions.get("🎉").users.array();
 
        for (var i = 0; i < peopleReacted.length; i++) {
            if (peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }
 
        if (peopleReacted.length == 0) {
            return message.channel.send(`**Giveaway 🎉 |** **${item}** Giveaway Ended! ❌\n\nThere was no winner determined!`);
        }
 
        if (peopleReacted.length < winnerCount) {
            return message.channel.send(`**Giveaway 🎉 |** **${item}** Giveaway! Ended ❌\n\n*There were not enough members entered in the giveaway!`);
        }
 
        for (var i = 0; i < winnerCount; i++) {
 
            inList = false;
 
            random = Math.floor(Math.random() * peopleReacted.length);
 
            for (var y = 0; y < winners.length; y++) {

              if (winners[y] == peopleReacted[random]) {
                    i--;

                    inList = true;
                    break;
                }
            }
 
            if (!inList) {
                winners.push(peopleReacted[random]);
            }
 
        }
 
        for (var i = 0; i < winners.length; i++) {
            message.channel.send(`**Giveaway 🎉 |** **Congratulations! ${winners[i]}**\n\nPrize(s) Won **» ${item}**`);
        }
 
    }, 1000 * time);
 
 
}
exports.conf = {
	aliases: ['hs'],
	cooldown: '5' 
}
exports.help = {
    name: "giveaway",
    description: "Start een giveaway"
}