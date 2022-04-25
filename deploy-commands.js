const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

// Read out ENV values
dotenv.config();
const TOKEN = process.env.TOKEN;
const GUILDID = process.env.GUILDID;
const CLIENTID = process.env.CLIENTID;

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Testet Live-status und Latenz des Bots.'),
	new SlashCommandBuilder().setName('server').setDescription('Gibt die Serverinfo aus.'),
	new SlashCommandBuilder().setName('user').setDescription('Gibt die Userinfo aus.'),
	new SlashCommandBuilder().setName('roles').setDescription('Generiert die Embed-Nachricht für die Rollenvergabe neu.'),
	new SlashCommandBuilder().setName('ban').setDescription('Verbannt einen Nutzer aus einer Subcommunity.'),
	new SlashCommandBuilder().setName('update').setDescription('Reloaded alle variablen des Bots.'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENTID, GUILDID), { body: commands })
	.then(() => console.log('Erfolgreich Slash-Befehle registriert.'))
	.catch(console.error);
