// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed, MessageComponentInteraction } = require('discord.js');
const dotenv = require('dotenv');

// Read out ENV values
dotenv.config();
var TOKEN = process.env.TOKEN;
var GUILDID = process.env.GUILDID;
var CLIENTID = process.env.CLIENTID;
var SUBCOMMUNITY_MSG_ID = process.env.SUBCOMMUNITY_MSG_ID;
var RULE_MSG_ID = process.env.RULE_MSG_ID;
var LOGGING_CHANNEL_ID = process.env.LOGGING_CHANNEL_ID;
var ROLE_CERB = process.env.ROLE_CERB;
var ROLE_NETT = process.env.ROLE_NETT;
var ROLE_THOR = process.env.ROLE_THOR;
var ROLE_LITA = process.env.ROLE_LITA;
var ROLE_PAND = process.env.ROLE_PAND;


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
			.setTitle('🍕 Mit wem möchtest du Pizza essen?')
			.setDescription('Klicke auf die Buttons zum folgen/entfolgen.')
			.setThumbnail('https://cerbion.net/content/spacepizzainn/pizza.png')
			.addFields(
				{ name: '\u200B', value: '\u200B' },
				{ name: '🔔 Benachrichtigungen', value: '• Du wirst nur für die Streamer angepingt denen du folgst.' },
				{ name: '💬 Kanäle', value: '• Du siehst spezielle Kanäle nur für die Streamer denen du folgst.' },
			)
			;// .setImage('https://cerbion.net/content/spacepizzainn/pizza.png');

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('cerb')
					.setLabel('Cerbion')
					.setStyle('SUCCESS')
					.setEmoji('🐙'),
			).addComponents(
				new MessageButton()
					.setCustomId('nett')
					.setLabel('nettgemeint')
					.setStyle('SUCCESS')
					.setEmoji('🤖'),
			).addComponents(
				new MessageButton()
					.setCustomId('thor')
					.setLabel('Thorsten')
					.setStyle('SUCCESS')
					.setEmoji('🎵'),
			).addComponents(
				new MessageButton()
					.setCustomId('lita')
					.setLabel('Lita')
					.setStyle('SUCCESS')
					.setEmoji('🐱'),
			).addComponents(
				new MessageButton()
					.setCustomId('pand')
					.setLabel('Panda')
					.setStyle('SUCCESS')
					.setEmoji('🦊'),
			);
		await interaction.reply({ ephemeral: false, embeds: [embed], components: [row] });
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
bot.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

	const buttonName = interaction.customId;
	const user = interaction.member;

	if (buttonName == 'cerb')
	{
		if(user.roles.cache.some(role => role.id === ROLE_CERB))
		{
			user.roles.remove(ROLE_CERB);
			await interaction.reply({ content: 'Du hast Cerbion entfolgt!', ephemeral: true });
		}
		else
		{
			user.roles.add(ROLE_CERB);
			await interaction.reply({ content: 'Du folgst nun Cerbion!', ephemeral: true });
		}
	} else if (buttonName == 'nett')
	{
		if(user.roles.cache.some(role => role.id === ROLE_NETT))
		{
			user.roles.remove(ROLE_NETT);
			await interaction.reply({ content: 'Du hast nettgemeint entfolgt!', ephemeral: true });
		}
		else
		{
			user.roles.add(ROLE_NETT);
			await interaction.reply({ content: 'Du folgst nun nettgemeint!', ephemeral: true });
		}
	} else if (buttonName == 'thor')
	{
		if(user.roles.cache.some(role => role.id === ROLE_THOR))
		{
			user.roles.remove(ROLE_THOR);
			await interaction.reply({ content: 'Du hast Thorsten entfolgt!', ephemeral: true });
		}
		else
		{
			user.roles.add(ROLE_THOR);
			await interaction.reply({ content: 'Du folgst nun Thorsten!', ephemeral: true });
		}
	} else if (buttonName == 'lita')
	{
		if(user.roles.cache.some(role => role.id === ROLE_LITA))
		{
			user.roles.remove(ROLE_LITA);
			await interaction.reply({ content: 'Du hast Lita entfolgt!', ephemeral: true });
		}
		else
		{
			user.roles.add(ROLE_LITA);
			await interaction.reply({ content: 'Du folgst nun Lita!', ephemeral: true });
		}
	} else if (buttonName == 'pand')
	{
		if(user.roles.cache.some(role => role.id === ROLE_PAND))
		{
			user.roles.remove(ROLE_PAND);
			await interaction.reply({ content: 'Du hast Panda entfolgt!', ephemeral: true });
		}
		else
		{
			user.roles.add(ROLE_PAND);
			await interaction.reply({ content: 'Du folgst nun Panda!', ephemeral: true });
		}
	}
	console.log(interaction);
});

// Login to Discord with your client's token
bot.login(TOKEN);



/// FUNCTIONS ///
async function log(_content)
{
	// await
    return;
}