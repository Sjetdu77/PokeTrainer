const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} = require('discord.js');
const { Stock } = require('../datas/stock');
const { regionsAndCities } = require('../datas/regionsAndCities.js');

let regions = regionsAndCities.keys();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('new_trainer')
        .setDescription('Crée un nouveau Dresseur')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Nom du dresseur')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('gender')
                .setDescription('Genre du dresseur')
                .setRequired(true)
                .addChoices(
                    { name: 'Fille', value: 'Fille' },
                    { name: 'Garçon', value: 'Garçon' },
                    { name: 'Inconnu', value: '?' }
                )
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns {void}
     */
    async execute(interaction) {
        const name = interaction.options.getString('name', true);
        const gender = interaction.options.getString('gender', true);
        const userId = interaction.user.id;

        Stock.trainerCreated.set(userId, new Map([['name', name], ['gender', gender]]));

        let content = `Bonjour, `;

        switch (gender) {
            case 'Garçon':
                content += 'monsieur ';
                break;

            case 'Fille':
                content += 'mademoiselle ';
                break;
        }
        content += `${name} !\n`;
        content += `Bienvenue dans le Monde des pokémons ! Je m'appelle Andy Swider, et je suis le développeur de l'application. C'est moi qui vous sert de Professeur Pokémon.\n`;
        content += `Les pokémons sont des créatures avec des pouvoirs, et ils ont tous une apparence et un habitat particuliers. Ils cohabitent avec les humains, se complétant et s'entraidant, bien qu'à une époque, les humains comme nous aient peur d'eux.\n`;
        content += `Dans ce monde, les combats de pokémons sont populaires, mais rien ne vous interdit de faire d'autres choses avec eux, pour renforcer vos liens.\n`;
        content += `Parlons un peu plus de vous.`;

        let select = new StringSelectMenuBuilder({
            custom_id: 'region',
            placeholder: 'Quelle est votre région ?'
        });

        for (const aRegion of regions) {
            select = select.addOptions(new StringSelectMenuOptionBuilder({
                label: aRegion,
                value: aRegion
            }));
        }

        const row = new ActionRowBuilder({components: [select]});

        return await interaction.reply({content, components: [row], ephemeral: true});
    },
};