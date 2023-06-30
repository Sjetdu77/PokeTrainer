const fs = require('node:fs');
const path = require('node:path');
const {
	Client,
	Events,
	Collection,
	GatewayIntentBits,
	ActionRowBuilder,
    StringSelectMenuBuilder,
} = require('discord.js');
const { token } = require('./config.json');
const { synchronize } = require('./classes.js');
const { Op } = require("sequelize");
const { Stock } = require('./datas/stock');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
    await synchronize();
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
    //const userId = interaction.user.id;

    //
});