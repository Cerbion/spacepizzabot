// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

// Read out ENV values
dotenv.config();
const TOKEN = process.env.TOKEN;
const GUILDID = process.env.GUILDID;
const SUBCOMMUNITY_MSG_ID = process.env.SUBCOMMUNITY_MSG_ID;
const RULE_MSG_ID = process.env.RULE_MSG_ID;
const LOGGING_CHANNEL_ID = process.env.LOGGING_CHANNEL_ID;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(TOKEN);