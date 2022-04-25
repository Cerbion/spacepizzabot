// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

// Read out ENV values
dotenv.config();
var TOKEN = process.env.TOKEN;
var GUILDID = process.env.GUILDID;
var CLIENTID = process.env.CLIENTID;
var SUBCOMMUNITY_MSG_ID = process.env.SUBCOMMUNITY_MSG_ID;
var RULE_MSG_ID = process.env.RULE_MSG_ID;
var LOGGING_CHANNEL_ID = process.env.LOGGING_CHANNEL_ID;


// Handle Intents
ints = Intents.default();
intents.members = true;
intents.reactions = true;

// Create a new client instance
// const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const bot = new Client({ intents: intents });

// When the client is ready, run this code (only once)
bot.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
bot.login(TOKEN);