const Discord = require("discord.js");
const { Canvas } = require("canvas-constructor");
const { get } = require("node-superfetch");
const db = require("quick.db");
const fishh = require('../../database/fish.json');

exports.run = async(client, message, args, color) => {
  try {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) user = message.author;
    if(user.bot) return message.channel.send(`Bots doesn't have profile`);

    let exp = await db.fetch(`level_${user.id}`)
    if(exp === null) {
     db.set(`level_${user.id}`, { level: 0, xp: 0 })
    };
    if(!fishh[user.id]){
      fishh[user.id] = {
        fish: 0
      };
    }

  let badge1 = await db.fetch(`badge1_${user.id}`);
  let badge2 = await db.fetch(`badge2_${user.id}`);
  let badge3 = await db.fetch(`badge3_${user.id}`);
  let badge4 = await db.fetch(`badge4_${user.id}`);
  let badge5 = await db.fetch(`badge5_${user.id}`);
  let badge6 = await db.fetch(`badge6_${user.id}`);

  let earlysupporter = await db.fetch(`earlysupporter_${user.id}`);
  let staffbadge = await db.fetch(`staffbadge_${user.id}`);
  if(!staffbadge) staffbadge = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png";
  if(!earlysupporter) earlysupporter = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png";

  let xp = exp.xp;
  let uLevel = exp.level;
  let nxtLvlXp = uLevel * 500;
  let difference = xp/nxtLvlXp *345;
  let rep = await db.fetch(`rep_${user.id}`);
  let Info = await db.fetch(`info_${user.id}`);
  let fish = await db.fetch(`fishy_${user.id}`);
  let work = await db.fetch(`works_${user.id}`);
  let dxp = await db.fetch(`doublexp_${user.id}`);
  let background = db.fetch(`background_${user.id}`);
  let balance = await db.fetch(`currency_${user.id}`);
  let dcash = await db.fetch(`doublecash_${user.id}`);
  let nickname = await db.fetch(`nickname_${user.id}`);
  let marry = await db.fetch(`marry_${user.id}`);
  if(marry === null) marry = "No one";

  if(!background) background = "https://cdn.discordapp.com/attachments/421620705570979843/722749620933099610/holoandlawrence.jpg";
  if(!dxp) dxp = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png";
  if(!dcash) dcash = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png";
  if(!badge1) badge1 = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png";
  if(!badge2) badge2 = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png";
  if(!badge3) badge3 = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png";
  if(!badge4) badge4 = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png";
  if(!badge5) badge5 = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png";
  if(!badge6) badge6 = "https://cdn.discordapp.com/attachments/596555821106724875/611905791389335564/UYgcytL.png";
  
  async function createCanvas() {
  var imageUrlRegex = /\?size=2048$/g;
  var namam = user.username;
  var jadim = namam.length > 10 ? namam.substring(0, 12) + "..." : namam;
  var mar = marry;
  var marj = mar.length > 10 ? mar.substring(0, 12) + "..." : mar;
  var {body: avatar} = await get(user.displayAvatarURL({format: "png", size: 2048, dynamic: true}));
  var {body: background1} = await get(background);
  var {body: background2} = await get('https://i.imgur.com/ryAeiC2.png');
  var {body: doublexp} = await get(dxp);
  var {body: doublecash} = await get(dcash);
  var {body: earlysupport} = await get(earlysupporter);
  var {body: admin} = await get(staffbadge);
  var {body: badge_1} = await get(badge1);
  var {body: badge_2} = await get(badge2);
  var {body: badge_3} = await get(badge3);
  var {body: badge_4} = await get(badge4);
  var {body: badge_5} = await get(badge5);
  var {body: badge_6} = await get(badge6);
  
  return new Canvas(1360, 768)
  .setColor('#000000')
  .addImage(background1, 0,0,1360, 768)
  .addBeveledImage(background2, 0,0, 1360, 768)
  .addImage(doublexp, 1060, 30,50,50)
  .addImage(doublecash, 1060, 85, 50, 50)
  .addImage(admin, 1060, 145, 50, 50)
  .addImage(earlysupport, 1060, 200, 50, 50)
  .addImage(badge_1, 350, 276, 100, 100)
  .addImage(badge_2, 470, 276, 100, 100)
  .addImage(badge_3, 585, 276, 100, 100)
  .addImage(badge_4, 695, 266, 120, 120)
  .addImage(badge_5, 820, 276, 100, 100)
  .addImage(badge_6, 940, 276, 100, 100)
  .setTextFont('bold 55px Verdana')
  .addText(`${jadim}`, 400, 90)
  .setTextFont('bold 38px Arial') 
  .addText(`${client.util.crFormat(balance || '0')}`, 400, 468)
  .addText(`${client.util.crFormat(rep || '0')}`, 400,555) 
  .addText(`${client.util.crFormat(fish || '0')}`,400,730)
  .addText(`${work || '0'}`,440,640)
  .setTextFont('30px Impact')
  .setTextFont('bold italic 30px Arial')
  .setTextFont('28px Arial')
  .addText(`${Info || 'A random person...'}`, 650,488)
  .setTextFont('italic 30px Verdana')
  .addText(`${nickname || `Holo Fan!`}`, 400, 125)
  .setTextFont('bold 38px Arial')
  .addText(`${client.util.crFormat(xp || '0')}/${client.util.crFormat(nxtLvlXp || `500`)}`, 700,232)
  .setTextFont('bold 17px Arial') 
  .setTextFont('bold 20px Arial')
  .setTextFont('bold 40px Verdana')
  .setTextAlign("center")
  .addText(`${uLevel}`, 545,232)
  .setColor("#459466")
  .setTextFont("bold 16px Arial")
  .setColor("#000000")
  .addRoundImage(avatar, 46, 44, 293, 293, 293/2)
  .setTextFont('bold 16px Arial')
  .setTextAlign("left")
  .setTextFont('28px Arial')
  .addText(`${marj}`, 610, 162)
  .toBufferAsync();
  }
  let m = await message.channel.send('**Loading Profile...** Please Wait.');
  let attachment = new Discord.MessageAttachment(await createCanvas(), "holoprofile.png")
  message.channel.send(attachment).then(() => {m.delete()});

  }catch(e) {
    message.channel.send(`Error has been occured\n\`${e.message}\``);
  };
};

exports.conf = {
  aliases: [],
  cooldown: "5"
};

exports.help = {
  name: "profile",
  description: "View your Profile with Stats, Background and more!",
  usage: "profile [@mention|userID]"
};