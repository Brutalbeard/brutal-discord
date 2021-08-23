import {SlashCommandBuilder} from '@discordjs/builders';
import {giphyClient} from "../lib/giphy-client"

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gifme')
        .setDescription('Get a random gif based on your search word/phrase')
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
                return element.name === 'search';
            });

        let giphyImage = await giphyClient
            .get('/search', {
                params: {
                    q: searchPhrase.value
                }
            })
            .then(res => {
                let resArray = res.data.data;
                let gif = resArray[Math.floor(Math.random() * resArray.length)];

                return gif.images.original.webp ? gif.images.original.webp : gif.images.original.url;
            })
            .catch(e => {
                console.error(e);
                return "Something went wrong :-/";
            });

        interaction
            .reply("\"" + searchPhrase.value + "\" " + giphyImage);
    },
};