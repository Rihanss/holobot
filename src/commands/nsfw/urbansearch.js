const { MessageEmbed } = require('discord.js');
const fetch = require('snekfetch');
const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20B046, 0xF2E807, 0xF207D1, 0xEE8419];
const cooldown = new Set();
exports.run = (client, message, args) => {
    if(!message.channel.nsfw) return message.channel.send('You can run this command inside NSFW channel').then(msg => {
     msg.delete(10000) 
    })
    const embed = new MessageEmbed()
    .setDescription('Please input a word to search!')
    .setColor('RED')
    
    let args1 = args.slice(0).join(" ")
    
    if (!args1) return message.channel.send(embed)
    fetch.get('http://api.urbandictionary.com/v0/define?term=' + args1).then(res => {
        if (res.body.list[0] === undefined) {
            return message.channel.send(`Couldn't find that word.. Check your spelling or the word you search is unavailable...`);
        }
        const definition = res.body.list[0].definition;
        const word = res.body.list[0].word;
        const Author = res.body.list[0].author;
        const exam = res.body.list[0].example;
        const thumup = res.body.list[0].thumbs_up;
        const thumdown = res.body.list[0].thumbs_down;
      const image = res.body.list[0].image;
      const permalink = res.body.list[0].permalink;
        const embed = new MessageEmbed()
        .setDescription(`Information for [${word}](${permalink})`)
        .setThumbnail(image)
    .setColor(hexcols[~~(Math.random() * hexcols.length)])
        .addField(`__**Definition**__:`, `${definition}`)
    .addField('Author:', `${Author}`)
    .addField('Example:', `${exam}`)
        .setFooter(`👍 ${thumup} | 👎 ${thumdown}`)
        message.channel.send({embed}).catch(e => client.logger.error(e));
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    });
};

exports.conf = {
  aliases: ["us"],
  cooldown: 3
}

exports.help = {
  name: 'urbansearch',
  description: 'Urban Search',
  usage: 'urbansearch <name>',
}