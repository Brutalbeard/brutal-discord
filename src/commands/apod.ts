import {SlashCommandBuilder} from '@discordjs/builders';
import {apodClient} from "../lib/apod-client";
import {MessageEmbed} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apod')
        .setDescription('NASA\'s astronomy Picture of the Day!')
        .addBooleanOption(bool => {
            bool
                .setName("random")
                .setDescription("Gets you a random image from sometime in the past")
                .setRequired(false);

            return bool;
        }),

    async execute(interaction) {
        let rand = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'random'
            });

        let queryDate = null;

        if (rand && rand.value === true) {
            queryDate = randomDate(new Date(1998, 0, 1), new Date());
        }

        const res = await apodClient
            .get('/apod', {
                params: {
                    date: queryDate,
                    api_key: process.env['APOD_KEY']
                }
            })
            .then(res => {
                return res.data;
            })
            .catch(e => {
                console.error(e);
            });

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(res.title)
            .setURL('https://discord.js.org')
            .setImage(res.hdurl)
            .setDescription(res.explanation ? res.explanation : "")
            .setFooter(res.copyright ? "Credit: " + res.copyright : "")
            .setTimestamp(new Date(res.date));

        await interaction
            .reply({
                embeds: [embed]
            });
    },
}

function randomDate(start, end) {
    let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}