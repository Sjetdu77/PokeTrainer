const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
} = require('discord.js');
const { Pokemon_Trainer } = require('../classes.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar_trainer')
        .setDescription(`Change l'image du dresseur`)
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Nom du dresseur')
                .setRequired(true)
        )
        .addAttachmentOption(option =>
            option.setName('avatar')
                .setDescription('Image du dresseur')
                .setRequired(true)
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns {void}
     */
    async execute(interaction) {
        const name = interaction.options.getString('name', true);
        const avatar = interaction.options.getAttachment('avatar', true);
        const userId = interaction.user.id;

        if (!avatar.contentType.startsWith('image')) {
            return await interaction.reply({content: `L'avatar n'est pas une image.`, ephemeral: true});
        }

        const trainer = await Pokemon_Trainer.findOne({ where: { name, userId } });
        if (!trainer) {
            return await interaction.reply({content: 'Aucun dresseur ne correspond.', ephemeral: true});
        }

        await trainer.update({ avatar: avatar.url });

        return await interaction.reply({content: 'Avatar changé', ephemeral: true});
    },
};