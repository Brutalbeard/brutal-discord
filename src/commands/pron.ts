import {SlashCommandBuilder} from '@discordjs/builders';
import * as Pornsearch from 'pornsearch';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('porn')
        .setDescription('Only works in NSFW channels, and no one else can see what filth you\'re into')
        .addStringOption(string => {
            string
                .setName("search")
                .setDescription("Nasty ass thing you're into")
                .setRequired(true);

            return string;
        }),

    async execute(interaction) {
        if (interaction.channel.nsfw === false) {
            await interaction.reply({
                content: 'Only works in NSFW chat channels.',
                ephemeral: true
            });

            return;
        }

        let searchPhrase = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'search';
            });

        let Searcher = new Pornsearch(searchPhrase);

        Searcher
            .gifs()
            .then((res: any) => {
                interaction
                    .reply({
                        content: res[Math.floor(Math.random() * res.length)].webm,
                        ephemeral: true
                    });
            })
            .catch((e: any) => {
                console.error(e);
            });
    },
};