const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db");

exports.run = async(client, message, args) => {
  try {
    let newInfo = args.join(" ");
    let len = 280;
    if(!newInfo) return args.missing(message, "You need to specify the message to set your info box", client.commands.get("setinfo").help);
    if(newInfo.length > len) return message.channel.send(`That's too much, please make it shorter. Max 280 Character Allowed`);
    let newsInfo = client.util.chunk(newInfo, 43).join('\n');
    let h = await message.channel.send('*Creating some information*');
    db.set(`info_${message.author.id}`, newsInfo);
    
    let notesEmbed = new MessageEmbed() 
    .setColor("RANDOM")
    .setTitle(`**Info Box**`)
    .setFooter(`Successfully Set! | Run z-profile to view your new Information`)
    .setDescription(stripIndents `${newsInfo}`)
    message.channel.send(notesEmbed).then(()=>{ h.delete()});
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``)
  };
};

exports.conf = {
  aliases: ['setbio'],
  cooldown: "5"
};

exports.help = {
  name: "setinfo",
  description: "Set your Info box for your profile.",
  usage: "setinfo <text>"
};