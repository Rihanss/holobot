const { MessageEmbed } = require("discord.js");
const { chunk, shuffle, randomRange } = require("../../handle/util");
const bombcount = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:"];
const db = require('quick.db');
const sessions = new Set();

module.exports.run = async (client, msg) => {
  if (sessions.has(msg.channel.id)) return msg.channel.send("**Minesweeper 💣 |** Only one game per round can happen!");
  sessions.add(msg.channel.id);
  try {
    let table = createTable();
    const now = Date.now();
    let mess = null;
    let isDoughBomb = false;
    let escaped = 0;
    let passes = 0;
    while (escaped < 36 - table.bombCount && !isDoughBomb) {
      const embedstart = new MessageEmbed()
        .setTitle("**Minesweeper 💣**")
        .setColor("#898989")
        .setDescription(`**Welcome, ${msg.author.username}!**\n\nTo start, reply with your Choice.\n**Example: A4 or A4F** | **F** means Flag 🚩\n\n${parseTable(table)}`)
        .setFooter("Decide Carefully! | $150 Win Reward", `${msg.author.displayAvatarURL({dynamic: true})}`);
      
      const embededit = new MessageEmbed()
        .setTitle("**Minesweeper 💣**")
        .setColor("#67d380")
        .setDescription(`**Good Choice!**\nTo continue, reply with your Choice...\n\n${parseTable(table)}`)
        .setFooter("Decide Carefully! | $150 Win Reward", `${msg.author.displayAvatarURL({dynamic: true})}`);
      if (!mess || passes % 4 === 0) {
        if (mess) await mess.delete();
        mess = await msg.channel.send(embedstart);
      } else { await mess.edit(embededit); }
      const filter = m => {
        const alphabet = ["a", "b", "c", "d", "e", "f"];
        const num = ["1", "2", "3", "4", "5", "6"];
        const [colum, line] = m.content.toLowerCase().split("");
        if (!alphabet.includes(colum) || !num.includes(line)) return false;
        if (table[post(line || "")][post(colum || "")].isDough) return false;
        if (m.content.length > 2 && m.content[2].toLowerCase() !== "f") return false;
        return true;
      };
      const response = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: 90000
      });
      if (!response.size) {
        await msg.channel.send(`**Minesweeper 💣 |** **Game OVER!** You took too long to respond.`);
        break;
      }
      const [colum, line, flag] = response.first().content.toUpperCase().split("").map((x, i) => i > 1 ? Boolean(x) : post(x));
      if (flag) {
        table[line][colum].isFlaged = true;
        passes++;
        continue;
      }
      table[line][colum].type === "bomb" ? isDoughBomb = true : escaped++;
      table = dig(table, colum, line);
      passes++;
    }
    sessions.delete(msg.channel.id);
    await mess.delete();
    if (!isDoughBomb && escaped < 36 - table.bombCount) return;
    
    if(isDoughBomb === false) db.add(`minesweeper_${msg.author.id}`, 1);
    if(isDoughBomb === false) db.add(`coins_${msg.author.id}`, 150);
    console.log('Stat Added win')
    const embed = new MessageEmbed()
      .setTitle("**Minesweeper 💣**")
      .setColor(isDoughBomb ? "RED" : "GREEN")
      .setDescription(`**Game OVER!**\n\nYou ${isDoughBomb ? "Lost ❌" : "Won ✅ *$150 Earned**"}\n**Reason »** ${isDoughBomb ? "You dug a Bomb!" : "Game Victory"}\n\n${parseTable(table)}`)
      .setFooter("To play again, run z-minesweeper");
    return msg.channel.send(embed);
  } catch (e) {
    sessions.delete(msg.channel.id);
    throw e;
  }
};

function dig(table, colum, line) {
  const init = table[line][colum];
  if (init.type === "bomb") {
    for (let i = 0; i < 6; i++) {
      for (let ii = 0; ii < 6; ii++) {
        if (table[i][ii].type === "floor") continue;
        table[i][ii].isDough = true;
      }
    }
  }
  table[line][colum].isDough = true;
  table[line][colum].isFlaged = false;
  if (!init.count && (init.type === "floor")) {
    const finalize = (x, y) => {
      table[y][x].isDough = true;
      table[y][x].isFlaged = false;
      if (!table[y][x].count) table = dig(table, x, y);
    };
    if (
      table[line + 1] &&
      !table[line + 1][colum].isDough &&
      table[line + 1][colum].type === "floor"
    ) { finalize(colum, line + 1); }
    if (
      table[line - 1] &&
      !table[line - 1][colum].isDough &&
      table[line - 1][colum].type === "floor"
    ) { finalize(colum, line - 1); }
    if (
      table[line][colum + 1] &&
      !table[line][colum + 1].isDough &&
      table[line][colum + 1].type === "floor"
    ) { finalize(colum + 1, line); }
    if (
      table[line][colum - 1] &&
      !table[line][colum - 1].isDough &&
      table[line][colum - 1].type === "floor"
    ) { finalize(colum - 1, line); }
  }
  return table;
}

function createTable() {
  let table = [];
  const bombCount = randomRange(8, 13); //8, 13
  for (let i = 0; i < 36; i++) {
    table.push({
      type: i < bombCount ? "bomb" : "floor",
      isFlaged: false,
      isDough: false,
      count: 0
    });
  }
  table = shuffle(table);
  table = chunk(table, 6);
  table.bombCount = bombCount;
  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 6; y++) {
      if (table[x][y].type === "bomb") continue;
      if (table[x + 1] && table[x + 1][y].type === "bomb") table[x][y].count++;
      if (table[x - 1] && table[x - 1][y].type === "bomb") table[x][y].count++;
      if (table[x][y + 1] && table[x][y + 1].type === "bomb") { table[x][y].count++; }
      if (table[x][y - 1] && table[x][y - 1].type === "bomb") { table[x][y].count++; }
      if (table[x + 1]) {
        if (table[x + 1][y + 1] && table[x + 1][y + 1].type === "bomb") { table[x][y].count++; }
        if (table[x + 1][y - 1] && table[x + 1][y - 1].type === "bomb") { table[x][y].count++; }
      }
      if (table[x - 1]) {
        if (table[x - 1][y + 1] && table[x - 1][y + 1].type === "bomb") { table[x][y].count++; }
        if (table[x - 1][y - 1] && table[x - 1][y - 1].type === "bomb") { table[x][y].count++; }
      }
    }
  }
  return table;
}

function parseTable(table) {
  let result = "⬛🇦 🇧 🇨 🇩 🇪 🇫";
  const numbers = "1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣".split(" ");
  const getEmo = piece => {
    if (piece.isFlaged) return "🚩";
    if (!piece.isDough) return "⬜";
    if (piece.count) return bombcount[piece.count - 1];
    return piece.type === "bomb" ? "💣" : "⬛";
  };
  for (let i = 0; i < 6; i++) { result += `\n${numbers[i]}${table[i].map(getEmo).join(" ")}`; }
  return result;
}

function post(inpt) {
  return ({ A: 1, B: 2, C: 3, D: 4, E: 5, F: 6 }[inpt.toUpperCase()] || parseInt(inpt, 10)) - 1;
}

function parseTime(ms) {
  if (ms >= 59999) return `${Math.round(ms / 60000)}m`;
  return `${ms}ms`;
}

exports.conf = {
    aliases: [],
    cooldown: "5"
}

exports.help = {
    name: "minesweeper",
    description: "Play a round of Minesweeper!",
    usage: "minesweeper"
}
