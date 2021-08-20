import {SlashCommandBuilder} from '@discordjs/builders';
import {MessageEmbed} from "discord.js";
import axios from "axios";
import * as moment from "moment";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trump')
        .setDescription('Get some random ass stupid (now deleted) tweet from the 45th President.'),

    async execute(interaction) {
        let embed = new MessageEmbed;

        await axios
            .get('https://api.tronalddump.io/random/quote')
            .then(res => {
                embed
                    .setAuthor(res.data._embedded.author[0].name)
                    .setFooter(moment(res.data.appeared_at).format("dddd, MMMM Do YYYY, h:mm:ss a"))
                    .setTitle("About - " + res.data.tags.join(','))
                    .setDescription(res.data.value)
                    .setURL(res.data._embedded.source[0].url);
            })
            .catch(e => {
                console.error(e);
            })
        interaction.reply({embeds: [embed]});
    },
};