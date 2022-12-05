// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock, inlineCode } = require('@discordjs/builders');
const dotenv = require('dotenv');
const tmi = require('tmi.js');
const Sequelize = require('sequelize');

// Read out ENV values
dotenv.config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV;
const TOKEN = process.env.TOKEN;
const USERNAME = process.env.USERNAME;
const OAUTH = process.env.OAUTH;
const TWITCH_CLIENTID = process.env.TWITCH_CLIENTID;
const TWITCH_SECRET = process.env.TWITCH_SECRET;
const TWITCH_ACCESS = process.env.TWITCH_ACCESS;
const TWITCH_PASS = process.env.TWITCH_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
var GUILDID = process.env.GUILDID;
var CLIENTID = process.env.CLIENTID;
var LOGGING_CHANNEL_ID = process.env.LOGGING_CHANNEL_ID;
var NEWS_CHANNEL_ID = process.env.NEWS_CHANNEL_ID;
var ROLE_CERB = process.env.ROLE_CERB;
var ROLE_NETT = process.env.ROLE_NETT;
var ROLE_THOR = process.env.ROLE_THOR;
var ROLE_LITA = process.env.ROLE_LITA;
var ROLE_PAND = process.env.ROLE_PAND;
var ROLE_YASH = process.env.ROLE_YASH;
var ROLE_VERIFIED = process.env.ROLE_VERIFIED;
var ROLE_18 = process.env.ROLE_18;

// CONFIG
const allchannels = ['cerbion','thorstenselbst','nettgemeint','litanoela','dapandaraw','yashiachan'];
const id_cerb = 38371604;
const id_thor = 715781187;
const id_nett = 83826505;
const id_lita = 610059339;
const id_pand = 131797761;
const id_yash = 69; // WRONG
const NL = "\n";
const HR = "\n────────────────────────\n";

// Initialize DB
// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
// 	host: DB_HOST,
// 	dialect: 'mysql',
// 	logging: false,
// 	// SQLite only
// 	// storage: 'database.sql',
// });
/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */
// const Stats = sequelize.define('stats', {
// 	userid: {
// 		type: Sequelize.STRING,
// 		unique: true,
// 	},
// 	messages: {
// 		type: Sequelize.INTEGER,
// 		defaultValue: 0,
// 		allowNull: false,
// 	},
// 	characters: {
// 		type: Sequelize.INTEGER,
// 		defaultValue: 0,
// 		allowNull: false,
// 	},
// 	jointime: Sequelize.DATE,
// });


// Create a new discord client instance
const discordClient = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// Create a new tmi client instance
const opts = {
    identity: {
        username: USERNAME,
        password: OAUTH
    },
        channels: allchannels,
};
const tmiClient = new tmi.Client(opts);

// When the client is ready, run this code (only once)
discordClient.once('ready', () => {
	// sync DB tags
	// Stats.sync();

	console.log('Connected to Discord!');
	discordClient.user.setPresence({ activities: [{ name: 'Kellner' }] });


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
		'mag jemand mein Duschbruder sein?',
		'Pizza ist einfach richtig MÄNNLICH.',
		'alles saugend ihr Geringverdiener?',
		'ich fahre die großen Pötte.',
		'Hühnchen ist nicht vegan?',
		'dumme Sprüche? Kann ich.',
		'kein Bier vor vier, gilt auch fürs Alter.',
		'Homosexualität... hihihihihihihihihihihihi.',
		'ich bin zu alt für den Scheiß.',
		'Hauptplatine beschädigt, Mainframe Systeme kritisch - klingt das nicht super cool?!',
		'hehe, 69.',


		't̯͖̮̰͓͙͇͖͎̖͚̽ͬ͑͗ͤ̄͆͂͆ͧ̋ͫͅh̞̼̹̲̘̯͔̠͈͇̯̑ͣͤͬ͌̈̐̌̇ͪ̾e͇̻͎ ̧̮̈e̫̜͙͙̻n͌͑̃̓̀̂ͮ̉̐d̔̀ͣͧ̓̃͊̇͏͕̰̮͉̞̘͚ͅ ̛̞̜͉͔̜̣̻̯̫̿̍͌ͦ͒͌ͬ͗ͤí̺̪͇̪̉̏́s͕̼̟̱̘̭͓̘͒̍ͧ̉ͤ̾͂ͮ̚ͅ ̸͚̦̘̳̘̞̝̩͖̻͈͓̕ͅǹe̵̴ͪ̑͐͠a̶͍͉̘̪̼͚̣̜̭̩̰̹͌ͯͯͯ̆̉̓͊͗ͭ̌̔̒ͅŕ͇̩͉̙̃̾̓̈͢ͅ.̸̡͕͉̣͓͓̣̲̗ͬ̃̈́͌̆̈ͦ̄͟',


		'Gestern wurden hier etwa 159 Pizzen bestellt und verspeist!',
		'oh was Süßes!',
		'weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
		'ich frage mich ob die stetig wachsende Entropie im Universum auch zu temporalen Anomalien führen kann.',
		'wenn Tomaten Obst sind... Bedeutet dass, das Ketchup Marmelade ist!?',
		'!songwunsch Dörte - LOS THORSTEN!',
		'meine Güte Cerbion, hängst du immer noch bei Malenia?',
		'Easyboy und Casualman sind letzte Folge auf den Fast Vermuter getroffen, so spannend!',
		'Panda ist einfach die besteste Zuckermaus. <3',
		'LUUUUTAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!',
		'sollten wir eine Selbsthilfegruppe eröffnen? Ihr wisst schon wegen dem Pizzafetisch.'];
	var randomWork = worktodo.random();
	log(`Ich beginne nun meine Schicht, ${randomWork}`);

	// Reminder for Roles & Channels
	if(isMonday())
	{
		const nChannel = discordClient.channels.cache.get(NEWS_CHANNEL_ID);
		try
		{
			nChannel.send("Einen wunderschönen Montag! ..." + randomWork
				+ "\n\n**Kleine Erinnerung an alle:**"
				+ "\n> Wenn ihr kaum Kanäle seht oder nichts schreiben könnt, habt ihr vielleicht die Regeln nicht akzeptiert.. holt das hier nach: <#956311310692413440>"
				+ "\n> Wer in den Subchanneln mitlesen und -reden möchte, braucht die entsprechende Rolle, holt sie euch: <#962839423362408508>"
				+ "\n> Ihr möchtet **noch** mehr Content? Bei <#1033835016121237544> solltet ihr fündig werden!"
				+ "\n> Ihr seid wundervoll, habt eine schöne Woche! ♥");
		}
		catch(e)
		{
			console.log(e);
			log("Konnte nicht in die news reinposten:\n\n" + e);
		}
	}

	// Let Twitch services start
	tmiClient.connect();
});

tmiClient.on('connected', onConnectedHandler);
function onConnectedHandler (addr, port) {

	if(ENV === 'DEV') return;
	console.log(`Connected to Twitch via ${addr}:${port}!`);
	log(`Verbunden mit Twitch Chat via ${addr}:${port}`);
}


discordClient.on('interactionCreate', async interaction => {
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

		const banner = 'https://cerbion.net/content/spacepizzainn/DC_welcome.png';

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
			// ).addComponents(
			// 	new MessageButton()
			// 		.setCustomId('thor')
			// 		.setLabel('Thorsten')
			// 		.setStyle('SUCCESS')
			// 		.setEmoji('🎵'),
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
			).addComponents(
				new MessageButton()
					.setCustomId('yash')
					.setLabel('Yashia')
					.setStyle('SUCCESS')
					.setEmoji('🍽'),
			);
		await interaction.reply({ files: [banner], ephemeral: false, embeds: [embed], components: [row], fetchReply: true  });
	} else if (commandName === 'rules') {

		const banner = 'https://cerbion.net/content/spacepizzainn/DC_rules.png';

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
			.setTitle('Hast du alle Regeln gelesen, verstanden und akzeptierst diese?')
			.setDescription('Du musst die Regeln mit dem Button hier akzeptieren um die anderen Kanäle sehen zu können!' + NL +
			'Mehr Kanäle findest du bei <#962839423362408508> und in <#1033835016121237544>!');

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('rules')
					.setLabel('Ja, Regeln sind cool!')
					.setStyle('SUCCESS')
					.setEmoji('✔️'),
			);
		await interaction.reply({ files: [banner], ephemeral: false, embeds: [rule1, rule2, rule3, rule4, rule5, rule6, rule7, rulebutton], components: [row], fetchReply: true  });
	} else if (commandName === 'streamplan') {

		const banner = 'https://cerbion.net/content/spacepizzainn/DC_Plan2.png';

		const section1 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('Streamplan')
		.setImage('https://cerbion.net/content/spacepizzainn/SpacePizzaInnSpinning.gif')
		.setDescription('Alle Streams auf einen Blick.')
			.addFields(
				{ name: 'LitaNoela', value: 'Streams finden vorerst nur spontan statt!' },
				{ name: 'THORSTENselbst', value: 'Streams finden vorerst nur spontan statt!' },
				{ name: 'DaPandaRaw', value: 'Aktuell finden keine Streams statt, bis die Weiterbildung abgeschlossen ist!' },
			);

		const monday = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('Montag')
		.setDescription('Wir sprechen nicht über das Space Pizza Inn. ;)' + NL + 'Gib niemals eine Bestellung ab, die du nicht bezahlen kannst.')
		.setThumbnail('https://cerbion.net/content/spacepizzainn/Wo_Mo.png');

		await interaction.reply({ files: [banner], ephemeral: false, embeds: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]  });
	} else if (commandName === 'faq') {

		const banner = 'https://cerbion.net/content/spacepizzainn/DC_FAQ1.png';

		const section1 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('F: Was ist das hier?')
		.setDescription('A: Der Community Discord Server von den Streamern: LitaNoela, YashiaChan, THORSTENselbst, DaPandaRaw, nettgemeint und Cerbion!');
		const section2 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('F: Ich interessiere mich nicht für alle Streamer, was nun?')
		.setDescription('A: Kein Thema! Hier bei der Rollenvergabe kannst du genau den Streamer(n) folgen für die du dich interessierst, klicke auf die Buttons um zu folgen oder entfolgen.');
		const section3 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('F: Wie qualifiziere ich mich für den 18+ Kanal?')
		.setDescription('A: Frage <@&956168982476501013> oder einen <@&956168339426791444>!');
		const section4 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('F: Wie bekomme ich die “Streamer”-Rolle?')
		.setDescription('A: Diese wird ausschließlich von den <@&956168339426791444> verteilt.');
		const section5 = new MessageEmbed()
		.setColor('#44ff88')
		.setTitle('F: Ich brauche Hilfe/Irgendwas funktioniert nicht!')
		.setDescription('A: Wenn der Bot mal nicht funktioniert oder etwas anderes nicht in Ordnung ist melde dich bitte bei einem <@&956168982476501013> oder <@&956168339426791444>.');

		await interaction.reply({ files: [banner], ephemeral: false, embeds: [section1, section2, section3, section4, section5]  });
	} else if (commandName === 'ban') {
		await interaction.reply(`Bann Funktion in Arbeit.`);
	} else if (commandName === '18') {
		// Give / Take 18+ Role
		// const targetUser = interaction.options.get('')
		// if(user.roles.cache.some(role => role.id === ROLE_18))
		// {
		// 	user.roles.remove(ROLE_18);
		// 	await interaction.reply({ content: 'Du bist bereits verifiziert!', ephemeral: true });
		// 	log(`${interaction.user.username} wurde die 18+ Rolle entzogen.`);
		// }
		// else
		// {
		// 	user.roles.add(ROLE_18);
		// 	await interaction.reply({ content: 'Du bist nun verifiziert, viel Spaß auf dem Server!', ephemeral: true });
		// 	log(`${interaction.user.username} wurde die 18+ Rolle gegeben.`);
		// }
	} else if (commandName === 'shoutout') {

		try
		{
			const soTarget = interaction.options.getString('twitchuser');
			const soURL = 'https://twitch.tv/' + soTarget.trim().toLowerCase();

			var soDesc = "Knusprig pikanter Stream, frisch aus dem Ofen!";	// READ FROM API
			var soTitle = "Schaut vorbei!";	// READ FROM API
			var soThumbnail = "https://cerbion.net/content/spacepizzainn/SpacePizzaInnSpinning.gif";	// READ FROM API


			const embed = new MessageEmbed()
				.setColor('#44ff88')
				.setAuthor({name: '🍕 Unsere heiße Empfehlung! 🍕'})
				.setTitle("Twitch.tv/" + soTarget + " ist gerade LIVE!")
				.setFooter({text: soURL})
				.setURL(soURL)
				.setDescription(soDesc)
				.setThumbnail(soThumbnail)
				.addFields(
					{ name: 'Jetzt Live!', value: soTitle },
				);
			await interaction.reply({ ephemeral: false, embeds: [embed]  });
		}
		catch(e)
		{
			log("Shoutout fehlgeschlagen!\n\n" + e);
		}
	} else if (commandName === 'update') {
		await interaction.reply(`Update Funktion in Arbeit.`);
	} else if (commandName === 'dbtest') {


		/*
			/dbtest name desc
		*/
		// define Tag and Description for DB entry
		const tagName = interaction.options.getString('name');
		const tagDescription = interaction.options.getString('description');

		console.log(`Tag: ${tagName} - ${tagDescription}`);

		try {
			const tag = await Stats.create({
				name: tagName,
				messages: tagDescription,
				characters: interaction.user.username,
				characters: interaction.user.username,
			});

			return interaction.reply(`Tag ${tag.name} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That tag already exists.');
			}

			return interaction.reply('Something went wrong with adding a tag.');
		}


        // const row = new MessageActionRow()
		// 	.addComponents(
		// 		new MessageSelectMenu()
		// 			.setCustomId('select')
		// 			.setPlaceholder('Nothing selected')
		// 			.addOptions([
		// 				{
		// 					label: 'Select me',
		// 					description: 'This is a description',
		// 					value: 'first_option',
		// 				},
		// 				{
		// 					label: 'You can select me too',
		// 					description: 'This is also a description',
		// 					value: 'second_option',
		// 				},
		// 			]),
		// 	);

		// await interaction.reply({ content: 'Update Funktion in Arbeit.', components: [row] });
	}
});


discordClient.on('messageCreate', async message => {

	return; // DISABLED
		try {
			const tag = await Stats.create({
				userid: message.author.id,
				messages: 69,
				characters: 6969,
				jointime: Date.UTC(),
			});

			console.log(`Message from ${message.author.username} entered into db!`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return console.log(`Entry already exists`);
			}

			return console.log(`Something went wrong.`);
		}
});

// Button Usage
discordClient.on('interactionCreate', async interaction => {
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
	// } else if (buttonName == 'thor')
	// {
	// 	if(user.roles.cache.some(role => role.id === ROLE_THOR))
	// 	{
	// 		user.roles.remove(ROLE_THOR);
	// 		await interaction.reply({ content: 'Du hast Thorsten entfolgt!', ephemeral: true });
	// 		log(`${interaction.user.username} folgt nicht mehr Thorsten.`);
	// 	}
	// 	else
	// 	{
	// 		user.roles.add(ROLE_THOR);
	// 		await interaction.reply({ content: 'Du folgst nun Thorsten!', ephemeral: true });
	// 		log(`${interaction.user.username} folgt jetzt Thorsten.`);
	// 	}
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
	} else if (buttonName == 'yash')
	{
		if(user.roles.cache.some(role => role.id === ROLE_YASH))
		{
			user.roles.remove(ROLE_YASH);
			await interaction.reply({ content: 'Du hast Yashia entfolgt!', ephemeral: true });
			log(`${interaction.user.username} folgt nicht mehr Yashia.`);
		}
		else
		{
			user.roles.add(ROLE_YASH);
			await interaction.reply({ content: 'Du folgst nun Yashia!', ephemeral: true });
			log(`${interaction.user.username} folgt jetzt Yashia.`);
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

discordClient.on('messageDelete', async message => {
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
	if(!message.partial && msg.author.id == discordClient.user.id) return;

	console.log('Message has been deleted.');
	var logtext = "Eine Nachricht wurde gelöscht:";
	logtext += "\n" + codeBlock(msg.content);
	log(logtext);
	return;
});

discordClient.on('userUpdate', async (olduser, newuser) => {
	console.log('User Data changed!');
	var logtext = "Die Daten von " + newuser.toString() + " wurden geändert, siehe **Servereinstellungen > Audit-Log**";
	log(logtext);
	return;
});

discordClient.on('guildMemberRemove', async guildmember => {
	console.log('User left the Server!');
	var logtext = guildmember.user.tag + " hat den Server verlassen oder wurde gekickt.";
	log(logtext);
	return;
});

// Login to Discord with your client's token
discordClient.login(TOKEN);

/// FUNCTIONS ///
async function log(_content)
{
	if(ENV === 'DEV') return;

	const channel = discordClient.channels.cache.get(LOGGING_CHANNEL_ID);
	try
	{
		channel.send("> " + _content);
	}
	catch(e)
	{
		console.log(e);
	}
    return;
}

Array.prototype.random = function(){
  return this[Math.floor(Math.random()*this.length)];
}

function isMonday(date = new Date()) {
  return date.getDay() === 1;
}