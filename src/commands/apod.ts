import {SlashCommandBuilder} from '@discordjs/builders';
import {apodClient} from "../lib/apod-client";
import {MessageEmbed} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apod')
        .setDescription('NASA\'s astronomy Picture of the Day!'),

    async execute(interaction) {
        const res = await apodClient
            .get('/apod', {
                params: {
                    api_key: process.env['APOD_KEY']
                }
            })
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.error(e)
            });

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(res.title)
            .setURL('https://discord.js.org')
            .setImage(res.hdurl)
            .setDescription(res.explanation ? res.explanation : "")
            .setFooter(res.copyright ? "Credit: " + res.copyright : null)
            .setTimestamp(new Date(res.date))

        await interaction
            .reply({
                embeds: [embed]
            });
    },
};