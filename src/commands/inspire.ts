import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from "discord.js";
import axios from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inspire')
        .setDescription('Get pumpted with a random ass quote'),

    async execute(interaction) {

        let embed = new MessageEmbed();

        await axios
            .get('https://api.quotable.io/random', {
                params: {
                    tags: "inspirational"
                }
            })
            .then(res => {
                embed
                    .setAuthor(res.data.author)
                    .setColor('#0099ff')
                    .setDescription(res.data.content);
            })
            .catch(e => {
                console.error(e);
            })

        interaction
            .reply({ embeds: [embed] });
    },
};