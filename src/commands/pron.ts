import {SlashCommandBuilder} from '@discordjs/builders';
const PornHub = require('pornhub.js');

const pornhub = new PornHub();

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

        let pornArr = await pornhub.search('Gif', encodeURIComponent(searchPhrase.value))
            .then(res => {
                return res.data;
            })
            .catch(e =>{
                console.error(e);
            });

        interaction
            .reply({
                content: pornArr[Math.floor(Math.random() * pornArr.length)].webm,
                ephemeral: true
            });
    },
};