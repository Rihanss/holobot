require("dotenv").config();
const { ShardingManager } = require('discord.js');
const config = require('./src/config.json');

const shards = new ShardingManager('./index.js', {
    token: process.env.TOKEN,
    totalShards: "auto"
});

shards.on('launch', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});

shards.spawn(this.totalShards, 20000, false);