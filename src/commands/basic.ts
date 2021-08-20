import {SlashCommandBuilder} from '@discordjs/builders';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('basic')
        .setDescription('Boiler Plate Command'),

    async execute(interaction) {
        interaction.reply("")
    },
};