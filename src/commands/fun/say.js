exports.run = async(client, message, args) => {
    let mess = args.join(' ')
    message.channel.send(mess)
}

exports.conf = {
    aliases: [],
    cooldown: "3"
  };
  
  exports.help = {
    name: 'say',
    description: 'Make the bot say something.',
    usage: 'say <text>'
  };
  