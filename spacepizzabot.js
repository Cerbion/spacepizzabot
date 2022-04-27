// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed, MessageComponentInteraction } = require('discord.js');
const dotenv = require('dotenv');

// Read out ENV values
dotenv.config();
var TOKEN = process.env.TOKEN;
var GUILDID = process.env.GUILDID;
var CLIENTID = process.env.CLIENTID;
var LOGGING_CHANNEL_ID = process.env.LOGGING_CHANNEL_ID;
var ROLE_CERB = process.env.ROLE_CERB;
var ROLE_NETT = process.env.ROLE_NETT;
var ROLE_THOR = process.env.ROLE_THOR;
var ROLE_LITA = process.env.ROLE_LITA;
var ROLE_PAND = process.env.ROLE_PAND;
var ROLE_VERIFIED = process.env.ROLE_VERIFIED;


// Create a new client instance
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
bot.once('ready', () => {
	console.log('Ready!');
	const worktodo = [
		'Tisch 3 sieht ja schrecklich aus! Da fange ich mal besser gleich an.',
		'da kommt schon der erste Gast, höchste Zeit produktiv zu werden!',
		'hat jemand mein "Frisch gewischt!" Schild gesehen?',
		'ich heize schonmal den Ofen vor!',
		'na nu? Da ist ja zu viel Geld in der Kasse... war das wieder Jay!?',
		'ich fürchte bei Tisch 12 ist jemand eingeschlafen... oder Tod.',
		'huch, ich glaube wir müssen bald wieder Mehl kaufen.',
		'oh man... Kann bitte jemand Panda sagen sie soll nicht ständig in der Pizzaküche mit Öl spritzen!?',
		'die erste Bestellung kommt sogar schon rei- moment die ist ja von Lita!',
		'aber was sind das für wundervolle Klänge? Ach Thorsten streamt wieder, alles klar.',
		'wollen wir bei Zeiten mal den Schichtplan- nein? Nagut.',
		'bereit die beste Pizza der ganzen Galaxie zu backen!',
		'ihr glaubt ja nicht wie viele Strohhalme jeden Tag verbraucht werden, wie kommt das bloß...?',
		'da liegt so ein komische Typ mit einem Senfglas hinter dem Tresen, bewusstlos von der ganzen Pizza, ist das nettgemeint?',
		'ein neuer Tag, Zeit für mehr Pizza!',
		'ist heute Montag? Fühlt sich irgendwie wie so ein Montag an.',
		'sagt mal ist euch auch manchmal nach singen? ♫',
		'ich gehe schon mal vorne aufschließen.',
		'kann bitte jemand Cerbion mal bitte davon überzeugen mit dem ganzen Geschwafel über Elden Ring aufzuhören!?',
		'412.540 Pizza Sorten erfolgreich geladen.',
		'nur noch schnell pinkeln gehen!',
		'Ananas oder keine Ananas auf Pizza, das ist hier die Frage!',
		'öhm, ich glaube an Tisch 9 sitzt seit gestern der selbe übermüdete Gast und hat mittlerweile locker 4 Pizzen weg, ach es ist Strausi!',
		'"Pizza Zumba" ist das heutige Spezialangebot, mit großzügigem Rabatt für Studenten... selbstverständlich.'];
	log(`Ich beginne nun meine Schicht, ${worktodo.random()}`);
	bot.user.setPresence({ activities: [{ name: 'Kellner' }] });
});

bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	log(`${interaction.user.username} hat den Befehl /${commandName} ausgeführt.`);

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
		await interaction.reply({ ephemeral: false, embeds: [embed], components: [row], fetchReply: true  });
	} else if (commandName === 'rules') {
		const embed = new MessageEmbed()
			.setColor('#44ff88')
			.setTitle('Hast du alle Regeln gelesen, verstanden und akzeptierst diese?');

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('rules')
					.setLabel('Ja, Regeln sind cool.')
					.setStyle('PRIMARY')
					.setEmoji('☑️'),
			);
		await interaction.reply({ ephemeral: false, embeds: [embed], components: [row], fetchReply: true  });
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
			log(`${interaction.user.username} folgt nicht mehr Cerbion.`);
		}
		else
		{
			user.roles.add(ROLE_CERB);
			await interaction.reply({ content: 'Du folgst nun Cerbion!', ephemeral: true });
			log(`${interaction.user.username} folgt jetzt Cerbion.`);
		}
	} else if (buttonName == 'nett')
	{
		if(user.roles.cache.some(role => role.id === ROLE_NETT))
		{
			user.roles.remove(ROLE_NETT);
			await interaction.reply({ content: 'Du hast nettgemeint entfolgt!', ephemeral: true });
			log(`${interaction.user.username} folgt nicht mehr nettgemeint.`);
		}
		else
		{
			user.roles.add(ROLE_NETT);
			await interaction.reply({ content: 'Du folgst nun nettgemeint!', ephemeral: true });
			log(`${interaction.user.username} folgt jetzt nettgemeint.`);
		}
	} else if (buttonName == 'thor')
	{
		if(user.roles.cache.some(role => role.id === ROLE_THOR))
		{
			user.roles.remove(ROLE_THOR);
			await interaction.reply({ content: 'Du hast Thorsten entfolgt!', ephemeral: true });
			log(`${interaction.user.username} folgt nicht mehr Thorsten.`);
		}
		else
		{
			user.roles.add(ROLE_THOR);
			await interaction.reply({ content: 'Du folgst nun Thorsten!', ephemeral: true });
			log(`${interaction.user.username} folgt jetzt Thorsten.`);
		}
	} else if (buttonName == 'lita')
	{
		if(user.roles.cache.some(role => role.id === ROLE_LITA))
		{
			user.roles.remove(ROLE_LITA);
			await interaction.reply({ content: 'Du hast Lita entfolgt!', ephemeral: true });
			log(`${interaction.user.username} folgt nicht mehr Lita.`);
		}
		else
		{
			user.roles.add(ROLE_LITA);
			await interaction.reply({ content: 'Du folgst nun Lita!', ephemeral: true });
			log(`${interaction.user.username} folgt jetzt Lita.`);
		}
	} else if (buttonName == 'pand')
	{
		if(user.roles.cache.some(role => role.id === ROLE_PAND))
		{
			user.roles.remove(ROLE_PAND);
			await interaction.reply({ content: 'Du hast Panda entfolgt!', ephemeral: true });
			log(`${interaction.user.username} folgt nicht mehr Panda.`);
		}
		else
		{
			user.roles.add(ROLE_PAND);
			await interaction.reply({ content: 'Du folgst nun Panda!', ephemeral: true });
			log(`${interaction.user.username} folgt jetzt Panda.`);
		}
	}else if (buttonName == 'rules')
	{
		if(user.roles.cache.some(role => role.id === ROLE_VERIFIED))
		{
			await interaction.reply({ content: 'Du bist bereits verifiziert!', ephemeral: true });
		}
		else
		{
			user.roles.add(ROLE_VERIFIED);
			await interaction.reply({ content: 'Du bist nun verifiziert, viel Spaß auf dem Server!', ephemeral: true });
			log(`${interaction.user.username} hat die Regeln angenommen.`);
		}
	}
});

// Login to Discord with your client's token
bot.login(TOKEN);



/// FUNCTIONS ///
async function log(_content)
{
	const channel = bot.channels.cache.get(LOGGING_CHANNEL_ID);
	channel.send(_content);
    return;
}

Array.prototype.random = function(){
  return this[Math.floor(Math.random()*this.length)];
}