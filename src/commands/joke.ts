import { SlashCommandBuilder } from '@discordjs/builders';
import axios from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Get a random joke. Hope it\'s funny')
        .addStringOption(string => {
            string
                .setName("topic")
                .setDescription("Some topic for the joke")
                .setRequired(false);

            return string;
        }),

    async execute(interaction) {
        let topic = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'topic';
            });

        let response = await axios
            .get(`https://sv443.net/jokeapi/v2/joke/${topic ? topic.value : "Any"}?type=single`)
            .then(res => {
                return res.data.joke;
            })
            .catch(e => {
                console.error(e);
            });

        interaction
            .reply(response);
    },
};