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
	new SlashCommandBuilder().setName('rules').setDescription('Generiert die Embed-Nachricht zum annehmen der Regeln.'),
	new SlashCommandBuilder().setName('streamplan').setDescription('Generiert die Embed-Nachricht für den Streamplan neu.'),
	new SlashCommandBuilder().setName('faq').setDescription('Generiert die Embed-Nachricht für die häufig gestellten Fragen neu.'),
	new SlashCommandBuilder().setName('ban').setDescription('Verbannt einen Nutzer aus einer Subcommunity.\n\nNutzung: `/ban @user cerb/thor/nett/pand/lita`'),
	new SlashCommandBuilder().setName('voiceban').setDescription('Verbannt einen Nutzer aus den Sprachkanälen.\n\nNutzung: `/voiceban @user`'),
	new SlashCommandBuilder().setName('giveaway').setDescription('Startet ein Giveaway.\n\nNutzung: `/so twitchname`'),
	new SlashCommandBuilder().setName('poll').setDescription('WIP'),
	new SlashCommandBuilder().setName('warn').setDescription('Verwarnt einen Nutzer.\n\nNutzung: `/warn @user`'),
	new SlashCommandBuilder().setName('so').setDescription('Shoutout für einen anderen twitchuser.\n\nNutzung: `/so twitchname`'),
	new SlashCommandBuilder().setName('update').setDescription('WIP'),

	new SlashCommandBuilder()
		.setName('dbtest')
		.setDescription('tests entry into database')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('tag name')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('description')
				.setDescription('tag description')
				.setRequired(true)),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENTID, GUILDID), { body: commands })
	.then(() => console.log('Erfolgreich Slash-Befehle registriert.'))
	.catch(console.error);
