const Discord = require("discord.js");
const { Canvas } = require("canvas-constructor");
const { get } = require("node-superfetch");
const db = require("quick.db");

exports.run = async(client, message, args, color) => {
  try {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    let imageUrlRegex = /\?size=2048$/g;
    if(!user) user = message.author;
    if(user.bot) return message.channel.send(`Bot doesn't have level`)

    let exp = await db.fetch(`level_${user.id}`)
    let dxp = await db.fetch(`doublexp_${user.id}`)
    let dcash = await db.fetch(`doublecash_${user.id}`)
    if(!dxp) dxp = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png"
    if(!dcash) dcash = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png"
    let status = {
    "online": "Online",
    "idle": "Idle",
    "dnd": "Do not Disturb",
    "offline": "Invisible"
    };

    let curxp = exp.xp;
    let curlvl = exp.level;
    let nxtLvl = exp.level * 500;
    let difference = curxp/nxtLvl *345;
    let difference2 = nxtLvl - curxp;
    let {body: avatar} = await get(user.displayAvatarURL({dynamic: true, format: "png", size: 128}));
    let namam = user.username;
    let jadim = namam.length > 10 ? namam.substring(0, 12) + "..." : namam;
    let {body: doublexp} = await get(dxp);
    let {body: doublecash} = await get(dcash);
    let {body: background1} = await get("https://cdn.discordapp.com/attachments/421620705570979843/722749620933099610/holoandlawrence.jpg");
    let {body: background2} = await get('https://i.imgur.com/evNvmeQ.png');

      async function createCanvas() {
      return new Canvas(1350, 661)
      .setColor('#000000')
      .addImage(background1, 0,0,1350,661)
      .addBeveledImage(background2, 0,0,1350,661)
      .addImage(doublexp, 505,75,120,120)
      .addImage(doublecash, 650, 75, 120, 120)
      .setTextFont('bold 65px NotoEmoji, Verdana') 
      .addText(`${jadim}`, 540, 340)
      .setTextFont('italic 30px NotoEmoji, Verdana')
      .addText(`#${user.discriminator} | Status: ${status[user.presence.status]}`, 540, 395)
      .setTextFont('bold 100px Arial')
      .addText(`${curlvl}`, 1065, 555)
      .setColor("#459466")
      .setTextFont("bold 50px Arial")
      .setColor("#000000")
      .setTextAlign("center")
      .addText(`${curxp || '0'}/${nxtLvl || '500'}`, 500, 555)
      .addRoundImage(avatar, 90, 62, 390, 390, 390/2)
      .toBufferAsync() 
      };
      const attachment = new Discord.MessageAttachment(await createCanvas(), "hololeveling.png")
    message.channel.send(attachment)     
  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``)
  };

};

exports.conf = {
  aliases: ["lvl", "rank"],
  cooldown: "4"
};

exports.help = {
  name: 'level',
  description: 'View your Level Card!',
  usage: 'level [@mention]'
};