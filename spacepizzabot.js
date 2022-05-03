// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed, ReactionUserManager } = require('discord.js');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock, inlineCode } = require('@discordjs/builders');
const dotenv = require('dotenv');
const tmi = require('tmi.js');

// Read out ENV values
dotenv.config();
const ENV = process.env.ENV;
const TOKEN = process.env.TOKEN;
const USERNAME = process.env.USERNAME;
const SECRET = process.env.SECRET;
const TWITCHID = process.env.TWITCHID;
var GUILDID = process.env.GUILDID;
var CLIENTID = process.env.CLIENTID;
var LOGGING_CHANNEL_ID = process.env.LOGGING_CHANNEL_ID;
var ROLE_CERB = process.env.ROLE_CERB;
var ROLE_NETT = process.env.ROLE_NETT;
var ROLE_THOR = process.env.ROLE_THOR;
var ROLE_LITA = process.env.ROLE_LITA;
var ROLE_PAND = process.env.ROLE_PAND;
var ROLE_VERIFIED = process.env.ROLE_VERIFIED;

// CONFIG
const NL = "\n";
const HR = "\n────────────────────────\n";


// Create a new discord client instance
const dcbot = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// Create a new twitch client instance
const opts = {
    identity: {
        username: USERNAME,
        password: 'oauth:' + SECRET
    },
        channels: [
		'cerbion',
		'thorstenselbst',
		'nettgemeint',
		'litanoela',
		'dapandaraw' ],
    options: {
        clientID: TWITCHID
    }
};
const twitchbot = new tmi.Client(opts);
twitchbot.connect();

// When the client is ready, run this code (only once)
dcbot.once('ready', () => {
	console.log('Connected to Discord!');
	dcbot.user.setPresence({ activities: [{ name: 'Kellner' }] });

	// Sent Startup/Ready Message to Logging Channel upon Start if not in DEV Environment
	if(ENV === 'DEV') return;
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
});

twitchbot.on('connected', onConnectedHandler);
function onConnectedHandler (addr, port) {
	console.log(`Connected to Twitch via ${addr}:${port}!`);
	log(`Connected to Twitch via ${addr}:${port}`);
}

dcbot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	// General Logic for commands

	const { commandName } = interaction;
	log(`${interaction.user.username} hat den Befehl /${commandName} ausgeführt.`);

	// Logic depends on commandName
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
				{ name: '\u2800', value: '\u2800' },
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

		const ruleheader = 'https://cerbion.net/content/spacepizzainn/DC_rules.png';

		const rule1 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('Regel 1: Die "Wichtigste" Regel')
		.setDescription('Wir sprechen nicht über das Space Pizza Inn. ;)' + NL + 'Gib niemals eine Bestellung ab, die du nicht bezahlen kannst.');
		const rule2 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('Regel 2: Seid lieb zueinander')
		.setDescription('Wir wollen hier keine Hass-/Hetzrede, Rassismus, Sexismus, heftige Beleidigungen oder Spam.');
		const rule3 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('Regel 3: Wir wollen hier nichts “Anstößiges”')
		.setDescription('Keine anstößige Texte oder Bilder bzw. kontroverse Posts, außer sie sind gestattet und dienen in <#963060688589312030> zur diskussion.');
		const rule4 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('Regel 4: Discord Name = Twitch Name')
		.setDescription('Um verwirrung zu Vermeiden, wäre es von Vorteil in Discord den gleichen Namen zu haben, wie auf Twitch. So wissen wir, wer du bist!');
		const rule5 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('Regel 5: Pizza ist niemals politisch oder extrem')
		.setDescription('Jeder hat und darf seine Meinung haben. Aber Pizza diskutiert nicht! Danke!');
		const rule6 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('Regel 6: SEID LIEB!')
		.setDescription('Wer Kloppe anfängt wird ins All geschossen und muss damit leben!');
		const rule7 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('Regel 7: Lasst ein Trinkgeld für den Klomann da');
		const rulebutton = new MessageEmbed()
			.setColor('#44ff88')
			.setTitle('Hast du alle Regeln gelesen, verstanden und akzeptierst diese?');

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('rules')
					.setLabel('Ja, Regeln sind cool.')
					.setStyle('SUCCESS')
					.setEmoji('✔️'),
			);
		await interaction.reply({ files: [ruleheader], ephemeral: false, embeds: [rule1, rule2, rule3, rule4, rule5, rule6, rule7, rulebutton], components: [row], fetchReply: true  });
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
dcbot.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	const buttonName = interaction.customId;
	const user = interaction.member;

	// Decide Logic based upon buttonName (unique Id)
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
	} else if (buttonName == 'rules')
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

dcbot.on('messageDelete', async message => {
	var msg = message;

	// Try to fetch full message if only partially received
	if(message.partial)
	{
		message.fetch()
			.then(fullMessage => {
				msg = fullMessage;
			})
			.catch(error => {
				// Nothing
			});
		if(msg.content == null)
		{
			msg.content = '- nicht mehr verfügbar -';
		}
	}

	// Abort if a Bot message was deleted
	if(!message.partial && msg.author.id == dcbot.user.id) return;

	console.log('Message has been deleted.');
	var logtext = "Eine Nachricht wurde gelöscht:";
	logtext += "\n\nGelöschte Nachricht:\n" + codeBlock(msg.content);
	log(logtext);
	return;
});

// bot.on('messageUpdate', async (oldmsg, newmsg) => {
// 	var msgOld = oldmsg;
// 	var msgNew = newmsg;

// 	// Try to fetch full message if only partially received
// 	if(oldmsg.partial)
// 	{
// 		oldmsg.fetch()
// 			.then((fullMessage) => {
// 				msgOld = fullMessage;
// 			})
// 			.catch(error => {
// 				// Nothing
// 			});
// 	}
// 	if(newmsg.partial)
// 	{
// 		newmsg.fetch()
// 			.then((fullMessage) => {
// 				msgNew = fullMessage;
// 			})
// 			.catch(error => {
// 				// Nothing
// 			});
// 	}

// 	// Abort if the message has not actually changed content
// 	if(msgOld.content == msgNew.content) return;

// 	console.log('Message has been changed.');
// 	var logtext = "Eine Nachricht wurde editiert:";
// 	logtext += "\n\nAlt:\n" + codeBlock(msgOld.content);
// 	logtext += "\n\nNeu:\n" + codeBlock(msgNew.content);
// 	log(logtext);
// 	return;
// });

dcbot.on('userUpdate', async (olduser, newuser) => {
	console.log('User Data changed!');
	var logtext = "Name von " + newuser.toString() + " wurde geändert:";
	logtext += "\n\nOriginalname:" + inlineCode(olduser.username);
	log(logtext);
	return;
});

dcbot.on('guildMemberRemove', async guildmember => {
	console.log('User left the Server!');
	var logtext = guildmember.username + guildmember.tag + " hat den Server verlassen oder wurde gekickt.";
	log(logtext);
	return;
});

// Login to Discord with your client's token
dcbot.login(TOKEN);



/// FUNCTIONS ///
async function log(_content)
{
	// if(ENV === 'DEV') return;

	const channel = dcbot.channels.cache.get(LOGGING_CHANNEL_ID);
	channel.send("> " + _content);
    return;
}

Array.prototype.random = function(){
  return this[Math.floor(Math.random()*this.length)];
}