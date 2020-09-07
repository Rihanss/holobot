const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color) => {

  var time = args[0];
  var reminder = args.splice(1).join(" ");

  const rem = await db.fetch(`remind_${message.author.id}`);

  if (!time)
    return message.channel.send(
      `** ⏰|** You must specify a time for this reminder.\n**Example »** \`5s\` for 5 Seconds **-** \`1h\` for 1 Hour **-** \`2d\` for 2 Days`
    );
  if (!reminder)
    return message.channel.send(
      `**⏰ |** You must specify what you want to be reminded for...\n**Example »** Redeem my Holo Bot Money!`
    );

  time = await time.toString();

  if (time.indexOf("s") !== -1) {
    var timesec = await time.replace(/s.*/, "");
    var timems = (await timesec) * 1000;
  } else if (time.indexOf("m") !== -1) {
    var timemin = await time.replace(/m.*/, "");
    timems = (await timemin) * 60 * 1000;
  } else if (time.indexOf("h") !== -1) {
    var timehour = await time.replace(/h.*/, "");
    timems = (await timehour) * 60 * 60 * 1000;
  } else if (time.indexOf("d") !== -1) {
    var timeday = await time.replace(/d.*/, "");
    timems = (await timeday) * 60 * 60 * 24 * 1000;
  } else {
    return message.channel.send(`**⏰|** Reminder Formats: \`5s\` for 5 Seconds **-** \`1m\` for 1 Minute **-** \`1h\` for 1 Hour **-** \`2d\` for 2 Days`);
  }
  
  let embed = new MessageEmbed()
    .setTitle(`**Reminder ⏰**`)
    .setDescription(`**You successfuly set a reminder!**\n\n**Reason »** ${reminder}\n**Duration »** ${time}`)
    .setFooter(`Make sure your DMs are open for Nate Bot to message you!`)
    .setColor(`#f4aa64`)
  message.channel.send(embed);
  
  let embedremind = new MessageEmbed()
    .setTitle(`**Reminder ⏰**`)
    .setDescription(`**${reminder}**\n\n**Duration »** ${time}`)
    .setColor(`#f4aa64`)
  message.author.send(embedremind)

  db.set(`remind_${message.author.id}.ms`, timems)
  db.set(`remind_${message.author.id}.reminder`, reminder)

  setTimeout(function() {
    
    let endembed = new MessageEmbed()
        .setTitle(`**Reminder ⏰**`)
        .setDescription(`**Reminder Time reached!**\n\n${reminder || `No Reminder...`}\n**Duration »** ${time}`)
        .setColor(`#f4aa64`)
        .setFooter(`This means, time to do your specified thing!`)

    message.author.send(endembed)
      .catch(err => console.log(`Error has been occurred!\n${err}`));
  }, parseInt(timems));
};

exports.conf = {
  aliases: ["remindme"],
  cooldown: "3"
};
exports.help = {
  name: "reminder",
  description: "Remind you for specific time",
  usage: "reminder <number>[s/m/h/d]"
};
