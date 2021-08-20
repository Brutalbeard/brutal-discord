import {SlashCommandBuilder} from '@discordjs/builders';
import {udClient} from "../lib/urban-dictionary";
import {MessageEmbed} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ud')
        .setDescription('Returns a definition of some awful phrase from Urban Dictionary')
        .addStringOption(string => {
            string
                .setName("search")
                .setDescription("Word or phrase you want to search for")
                .setRequired(true);
            return string;
        }),

    async execute(interaction) {

        let searchPhrase = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'search'
            });

        let embed = new MessageEmbed;

        await udClient
            .get('/define', {
                params: {
                    term: searchPhrase.value
                }
            })
            .then(res => {
                let def = res.data.list[0];
                embed
                    .setAuthor(def.author)
                    .setTitle(def.word)
                    .setDescription(def.definition.replace(/\[|\]/g, ''))
                    .setFooter("Example: " + def.example.replace(/\[|\]/g, ''));
            })
            .catch(e => {
                console.error(e);
            });

        interaction.reply({embeds: [embed]});
    },
};