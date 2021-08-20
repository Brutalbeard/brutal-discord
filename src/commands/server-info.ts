import {SlashCommandBuilder} from '@discordjs/builders';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with information about the server'),
    async execute(interaction) {
        await interaction.reply({content: "I'll get to it eventually", ephemeral: true});
    },
};