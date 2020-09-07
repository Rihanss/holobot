const unscramble = require('unscramble')

exports.run = async(client, message, args) => {
  let text = args.join(' ')
  
 let e = unscramble(text)
 message.channel.send(`Result of Unscrambling and Scrabbling \`${text}\`:\n${e}`)
  
}

exports.conf = {
 aliases: [],
  cooldown: 5
}

exports.help = {
  name: 'unscramble',
  description: 'Unscramble text into right text',
  usage: 'unscramble <text>'
}