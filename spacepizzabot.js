// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');
const dotenv = require('dotenv');
const tmi = require('tmi.js');

// Read out ENV values
dotenv.config();
const ENV = process.env.ENV;
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
		'"Pizza Zumba" ist das heutige Spezialangebot, mit großzügigem Rabatt für Studenten... selbstverständlich.',
		'Ihhh ich glaube nettgemeint hat recht, aber wer zum Teufel kotzt bitte GEGEN eine Wand?!',
		'da vorne kommt gerade ein sehr schafiger Gast, sieht aus wie Lish!',
		'warum ist Pizza eigentlich so verdammt geil?',
		'wusstet ihr, dass die größte Pizza der Welt 2013 in Rom gebacken wurde und über 23t wiegt bei 40m Durchmesser?',
		'hey, psst: Es gibt einen Arzt der Pizza verschreibt, fragt mal nach Dr. Oetker :D',
		'ich glaube ja, dass wir alle effizienter arbeiten könnten, wenn ich bezahlt werden würde.',
		'die Eismaschine ist ja schon wieder kaputt! Meh.. darum kümmere ich mich mal... nächste Woche oder so...',
		'ich suche ein Kind namens John Connor, achso und ich brauche eure Motorradjacke... und euer Motorrad!',
		'wäre doch schrecklich wenn die Luftschleuse eine Fehlfunktion hätte...',
		'Oh was Süßes!',
		'laut Duden: (meist heiß servierte) aus dünn ausgerolltem und mit Tomatenscheiben, Käse u. a. belegtem Hefeteig gebackene pikante italienische Spezialität (meist in runder Form) - Pizza.',
		'ich schrubbe hier, ich schrubbe da, ich schrubbe einfach wunderbaaar ♫',
		'die Ungewissheit des Universum ist nur ein Vorgeschmack auf dessen Hitzetod.',
		'hehehe.. Uranus.. versteht ihr?',
		'ich werde noch mal fix los und hole mehr glutenfreies Mehl!',
		'ahhh der Geruch von frischem Oregano... köstlich.',
		'ich schwöre wenn ich noch mal jemanden dabei erwische einen Kaugummi unter einen Tisch zu kleben, DANN RASTE ICH AUS!',
		'Pizza kann einem echt fast jeden doofen Tag retten.',
		'wann ist nochmal meine Probezeit vorbei?',
		'ERROR 59-200: CRITICAL FAILURE OF PROCESS - NUCLEAR INCIDENT IMMINENT.',
		'Käse im Rand, ich sage euch Leute... KÄSE IM RAND.',
		'Cerbion zwingt mich dazu ständig blöde Dinge von mir zu geben...',
		'hey Lita! :wave:',
		'das Kühlzeug wird langsam wieder warm, Yashia würdest du so nett sein und nochmal kurz deine Hände ranhalten?',
		'das Leben.. ehh.. findet einen Weg...  zur Pizza!',
		'sollten wir eine Selbsthilfegruppe eröffnen? Ihr wisst schon wegen dem Pizzafetisch.'];
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
			.setThumbnail('https://cerbion.net/content/spacepizzainn/SpacePizzaInnSpinning.gif')
			.addFields(
				{ name: '\u2800', value: '\u2800'.repeat(20) },
				{ name: '🔔 Benachrichtigungen', value: '• Du wirst nur für die Streamer angepingt denen du folgst.' },
				{ name: '💬 Kanäle', value: '• Du siehst spezielle Kanäle nur für die Streamer denen du folgst.' },
			);

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
					.setStyle('SUCCESS')
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
	if(ENV === 'DEV') return;

	const channel = bot.channels.cache.get(LOGGING_CHANNEL_ID);
	channel.send("> " + _content);
    return;
}

Array.prototype.random = function(){
  return this[Math.floor(Math.random()*this.length)];
}