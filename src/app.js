require("dotenv").config();

const HoloClient = require("./handle/HoloClient");
const { Discord, Client, Util, MessageEmbed, Collection } = require('discord.js');
const { config, restnode, nodes } = require("./config.json");
const { stripIndents } = require("common-tags");
const { get } = require("node-superfetch");
const Enmap = require("enmap");
const client = new HoloClient({
    disableMentions: 'everyone',
    messageCacheMaxSize: 50,
    messageCacheLifetime: 60,
    messageSweepInterval: 120,
    partials: [
        'MESSAGE',
        'USER',
        'GUILD_MEMBER',
        'CHANNEL'
    ],
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_VOICE_STATES',
        'GUILD_PRESENCES',
        'GUILD_PRESENCES',
        'GUILD_MESSAGES_REACTIONS',
        'GUILD_MEMBERS'
    ],
});

const NekosLifeAPI = require('nekos.life');
client.warns = new Enmap({name: 'warns'});;
client.blacklist = new Enmap({name: 'blacklist'});
client.autorole = new Enmap({name: 'autorole'});
client.nekoslife = new NekosLifeAPI();

require('./handle/events')(client);
require('./handle/module')(client);
  
client.login(process.env.TOKEN);