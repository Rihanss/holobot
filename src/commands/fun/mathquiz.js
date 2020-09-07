const { MessageEmbed } = require("discord.js");
const operations = ['+', '-', '*'];

let done = [
    "Nice one, You deserve `A+` for answering",
    "Nice job, You deserve `A+` for right answer",
    "Good job! You're smart for answering this"
]

exports.run = async(client, message, args) => {
    try {
        const d = done[Math.floor(Math.random() * done.length)]
        const value1 = Math.floor(Math.random() * 1000) + 1;
        const value2 = Math.floor(Math.random() * 1000) + 1;
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let answer;
        switch (operation) {
            case '+': answer = value1 + value2; break;
            case '-': answer = value1 - value2; break;
            case '*': answer = value1 * value2; break;
        }
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} Math Quiz`, message.author.displayAvatarURL)
        .setDescription(`*You only have 10 seconds to answer*\n\n${value1} ${operation} ${value2}`)
        .setColor(`GREEN`)
        .setTimestamp()
        await message.channel.send(embed)
        const messages = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 10000
        });
        if (!messages.size) return message.reply(`Time is up! The answer was \`${answer}\``);
        if (messages.first().content !== answer.toString()) return message.reply(`Wrong answer, The answer was \`${answer}\``);
        return message.reply(d);
    }catch(e) {
        message.channel.send(`Error has been occured\n\`${e.message}\``);
    };
};

exports.conf = {
    aliases: ['qna'],
    cooldown: "5"
}

exports.help = {
    name: "mathquiz",
    description: "play Math quiz game with randomly generated number",
    usage: "mathquiz"
}