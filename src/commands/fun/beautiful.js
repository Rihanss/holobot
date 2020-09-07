const { Canvas } = require("canvas-constructor");
const { get } = require("node-superfetch");

exports.run = async(client, message, args) => {
  try {
    let user;
    if (message.mentions.users.size) { user = message.mentions.users.first(); }
    else if (args[1]) { user = await message.guild.members.fetch(args[1]);
    if (user) { user = user.user; } };
    if (!user) { user = message.author; };
    const image = await getBeautiful(client, user.displayAvatarURL({dynamic: true, format: "png"}));
    message.channel.send({files: [{attachment: image, name: 'beautiful.png'}]})
  }catch(e) {
    message.channel.send(`Error has been occured\n${e.message}`);
  };
};

async function getBeautiful(client, avatar){
	const base = await get('https://cdn.discordapp.com/attachments/528192146080268328/588730497744764958/2b4.png');
	const toMeme = avatar.replace(/\.gif.+/g, '.png');
	const { body } = await get(toMeme);
	return new Canvas(634, 675)
    .setColor(client.color)
    .addRect(0, 0, 634, 675)
    .addImage(body, 423, 45, 168, 168)
    .addImage(body, 426, 382, 168, 168)
    .addImage(base.body, 0, 0, 634, 675)
    .toBuffer();
};

exports.conf = {
   aliases: [],
  cooldown: 5
}

exports.help = {
  name: 'beautiful',  
  description: "Draws user/your avatar over the 'Beautiful' poster", 
  usage: 'beautiful [@user]'
} 