const fs = require('node:fs');
const path = require('node:path');
const {
	Client,
	Events,
	Collection,
	GatewayIntentBits,
	ActionRowBuilder,
    StringSelectMenuBuilder,
	Partials,
	ButtonBuilder,
	ButtonStyle,
	StringSelectMenuOptionBuilder,
} = require('discord.js');
const { token } = require('./config.json');
const { synchronize, Pokemon_Trainer } = require('./classes.js');
const { Op } = require("sequelize");
const { Stock } = require('./datas/stock');
const regionsAndCities = require('./datas/regionsAndCities.js');

const yesButton = new ButtonBuilder()
	.setCustomId('yes')
	.setLabel('Oui')
	.setStyle(ButtonStyle.Success);

const noButton = new ButtonBuilder()
	.setCustomId('Non')
	.setStyle(ButtonStyle.Danger);

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages
	],
	partials: [
		Partials.Message
	]
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async c => {
    await synchronize();
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	const userId = interaction.user.id;

    if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	} else if (interaction.isStringSelectMenu()) {
		const trainerCreated = Stock.trainerCreated.get(userId);
		if (interaction.customId === 'region') {
			const region = interaction.values[0];
			trainerCreated.set('region', region);
			
			const professor = regionsAndCities.regionsToProfessors.get(region);
			let content = `Vous vivez donc à ${region}`;
			if (professor) {
				content += `, avec pour Professeur Pokémon le Professeur ${professor.nom} de ${professor.lieu}`;
			}
			content += `. Où, plus précisément ?`;
			let select = new StringSelectMenuBuilder({
				custom_id: 'city',
				placeholder: 'Quelle est votre ville ?'
			});
			for (const aCity in regionsAndCities.regionsAndCities.get(region)) {
				select = select.addOptions(new StringSelectMenuOptionBuilder({
					label: aCity,
					value: aCity
				}));
			}

			const row = new ActionRowBuilder({components: [select]});
			return await interaction.update({content, components: [row]});
		} else if (interaction.customId === 'city') {
			const city = interaction.values[0];

			await Pokemon_Trainer.create({
				name: trainerCreated.get('name'),
				gender: trainerCreated.get('gender'),
				origins: `${trainerCreated.get('region')}/${city}`,
				userId,
			});

			let content = `Vous vivez donc à ${city}, à ${trainerCreated.get('region')}.\n\n`;
			content += `${trainerCreated.get('name')}, une vie de grandes aventures vous attend ! Utilisez la commande /get_starter pour commencer votre aventure !`;
			return await interaction.update({content, components: []});
		}
	}
});

client.on(Events.MessageCreate, async message => {
	const authorId = message.author.id;
	if (authorId === '1075330715509604392') return;
})