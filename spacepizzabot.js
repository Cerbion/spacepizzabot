// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');

// Read out ENV values
dotenv.config();
var TOKEN = process.env.TOKEN;
var GUILDID = process.env.GUILDID;
var CLIENTID = process.env.CLIENTID;
var SUBCOMMUNITY_MSG_ID = process.env.SUBCOMMUNITY_MSG_ID;
var RULE_MSG_ID = process.env.RULE_MSG_ID;
var LOGGING_CHANNEL_ID = process.env.LOGGING_CHANNEL_ID;


// Create a new client instance
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
bot.once('ready', () => {
	console.log('Ready!');
});

bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Servername: ${interaction.guild.name}\nMitglieder: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`User-tag: ${interaction.user.tag}\nUser-id: ${interaction.user.id}`);
	} else if (commandName === 'roles') {
		const embed = new MessageEmbed()
			.setColor('#44ff88')
			.setTitle('🍕 Mit wem willst du Pizza essen?')
			.setAuthor({ name: 'Das Space-Pizza-Inn Team'})
			.setDescription('____________________')
			.setThumbnail('https://cerbion.net/content/spacepizzainn/pizza.png')
			.addFields(
				{ name: '\u200B', value: '\u200B' },
				{ name: '🔔 Benachrichtigungen', value: 'Du bekommst nur für die Streamer denen du folgst Benachrichtigungen wenn sie Live gehen oder wenn es etwas wichtiges gibt.' },
				{ name: '\u200B', value: '\u200B' },
				{ name: '💬 Kanäle', value: 'Für jeden Streamer gibt es einen Bereich mit Kanälen, den du nur siehst wenn du ihm/ihr folgst.' },
			)
			.setImage('https://cerbion.net/content/spacepizzainn/pizza.png');

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('cerb')
					.setLabel('Cerbion')
					.setStyle('PRIMARY')
					.setEmoji('🐙'),
			).addComponents(
				new MessageButton()
					.setCustomId('nett')
					.setLabel('nettgemeint')
					.setStyle('PRIMARY')
					.setEmoji('🤖'),
			).addComponents(
				new MessageButton()
					.setCustomId('thor')
					.setLabel('Thorsten')
					.setStyle('PRIMARY')
					.setEmoji('🎵'),
			).addComponents(
				new MessageButton()
					.setCustomId('lita')
					.setLabel('Lita')
					.setStyle('PRIMARY')
					.setEmoji('🐱'),
			).addComponents(
				new MessageButton()
					.setCustomId('pand')
					.setLabel('Panda')
					.setStyle('PRIMARY')
					.setEmoji('🦊'),
			);
		await interaction.reply({ content: 'Rollenembed in Arbeit.', ephemeral: true, embeds: [embed], components: [row] });
	} else if (commandName === 'ban') {
		await interaction.reply(`Bann Funktion in Arbeit.`);
	} else if (commandName === 'update') {
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

		await interaction.reply({ content: 'Update Funktion in Arbeit.', components: [row] });
	}
});

// Button Usage
bot.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	console.log(interaction);
});

// Login to Discord with your client's token
bot.login(TOKEN);



/// FUNCTIONS ///
function log(_content)
{
    return;
}