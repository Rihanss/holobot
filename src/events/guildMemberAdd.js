const { MessageEmbed } = require("discord.js");
const { Canvas } = require("canvas-constructor");
const { stripIndents } = require("common-tags");
const { join, resolve } = require("path");
const superagent = require("node-superfetch");
const db = require("quick.db");

Canvas.registerFont(resolve(join(__dirname, '../assets/font/Breesh.ttf')), 'Breesh');
Canvas.registerFont(resolve(join(__dirname, '../assets/font/Tahoma.ttf')), 'Tahoma'); 

module.exports = async(client, member) => {
  try {
    let overlay = "https://i.imgur.com/SDECCJt.png";

    async function join() {
      let backgrounddb = await db.fetch(`welcomebackground_${member.guild.id}`);
      let secondMessage = await db.fetch(`secondMessage_${member.guild.id}`)
      if(!secondMessage) secondMessage = "Please Enjoy Your Stay!";
      if(!backgrounddb) backgrounddb = "https://i.imgur.com/MlKjm5h.png";
      
      let imageUrlRegex = /\?size=2048$/g;
      let namam = member.user.username;
      let jadim = namam.length > 12 ? namam.substring(0, 10) + "..." : namam;
      let total = member.guild.memberCount;
      let {body: avatar} = await superagent.get(member.user.displayAvatarURL({format: "png", size: 2048, dynamic: true}));
      let {body: background} = await superagent.get(`${backgrounddb}`);
      let {body: overlay2} = await superagent.get(overlay);

      return new Canvas(850, 470)
      .addRect(0, 0, 850, 470)
      .save()
      .addBeveledImage(background, 0,0,850,470)
      .addImage(overlay2, 0,0,850,470)
      .setTextAlign('center')
      .setColor('#ab7654')
      .setTextFont('bold 30px Breesh')
      .addText(secondMessage, 430, 450)
      .setTextFont('bold 45px Tahoma')
      .setColor('#664733')
      .setTextAlign('center')
      .addText(`${jadim}#${member.user.discriminator}`, 430, 390)
      .restore()
      .addRoundImage(avatar, 320, 23, 212, 212, 212/2)
      .toBuffer()
      };
    
    let on = await db.fetch(`welcome_${member.guild.id}`);
    if(on === null) return;
    if(on === "off") return;
    if(on === "on") {
      let channel = await db.fetch(`welcomechnl_${member.guild.id}`);
      let chnl = member.guild.channels.cache.get(channel);
      if(!channel) return;

      const embed = new MessageEmbed()
      .setColor(`RANDOM`)
      .setTitle(`**Welcome**`)
      .setDescription(stripIndents `
      Hello **${member.user.tag}**, Welcome to \`${member.guild.name}\`
      *We now have **\`${member.guild.memberCount}\`** members!*
      `)
      .attachFiles({ attachment: await join(), name: "holo-join.png" })
      .setImage("attachment://holo-join.png")
      chnl.send(embed);
    };
  }catch(e) {
    console.log(`Error has been occured\n${e.message}`);
  };
};