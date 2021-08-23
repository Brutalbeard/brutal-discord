import {SlashCommandBuilder} from '@discordjs/builders';

const sides = ["Heads", "Tails"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flip a coin'),

    async execute(interaction) {
        interaction
            .reply(sides[Math.floor(Math.random() * sides.length)]);
    },
};