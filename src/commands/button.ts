import {SlashCommandBuilder} from '@discordjs/builders';
import db from '../lib/mongo-client';
import * as Chance from 'chance';

const chance = new Chance();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('butt')
        .setDescription('Get some buttons!'),

    async execute(interaction) {
        let myId = chance.guid();

        let newTrivia = {
            id: myId,
            smartUsers: [],
            dumbUsers: [],
            row: {
                components: []
            }
        };

        // const row = new MessageActionRow()
        //     .addComponents(
        //         new MessageButton()
        //             .setCustomId('primary')
        //             .setLabel('Primary')
        //             .setStyle('PRIMARY'),
        //     );
        //
        // console.log(row.toJSON())

        // let dbObject = await db
        //     .trivia
        //     .insertOne(newTrivia)
        //     .catch(e => {
        //         console.error("DB ERROR: ", e);
        //     });

        newTrivia.row = {
            components: [
                {
                    custom_id: `${myId}-1`,
                    disabled: false,
                    emoji: null,
                    label: 'Answer 1',
                    style: 2,
                    type: 2,
                    url: null,
                    correctAnswer: true,
                    timesChosen: 0
                },
                {
                    custom_id: `${myId}-2`,
                    disabled: false,
                    emoji: null,
                    label: 'Answer 2',
                    style: 2,
                    type: 2,
                    url: null,
                    correctAnswer: false,
                    timesChosen: 0
                },
                {
                    custom_id: `${myId}-3`,
                    disabled: false,
                    emoji: null,
                    label: 'Answer 3',
                    style: 2,
                    type: 2,
                    url: null,
                    correctAnswer: false,
                    timesChosen: 0
                },
                {
                    custom_id: `${myId}-4`,
                    disabled: false,
                    emoji: null,
                    label: 'Answer 4',
                    style: 2,
                    type: 2,
                    url: null,
                    correctAnswer: false,
                    timesChosen: 0
                }
            ],
            //@ts-ignore
            type: 1
        }

        let dbObject = await db
            .trivia
            .insertOne(newTrivia)
            .catch(e => {
                console.error("DB ERROR: ", e);
            });

        let time = 3;
        await interaction
            .reply({content: `Butts ${time}!`, components: [newTrivia.row]});

        let countdown = setInterval(() => {
            time -= 1;
            interaction
                .editReply({content: `Butts ${time}!`, components: [newTrivia.row]});
        }, 1000)

        setTimeout(async () => {
            console.log(newTrivia.row)

            let finalTrivia = await db
                .trivia
                .findOne({
                    id: myId
                }).then(res => {
                    return res;
                }).catch(e => {
                    console.error(e);
                });

            let components = finalTrivia.row.components;

            for (let i in components) {
                components[i].disabled = true;
                if (components[i].correctAnswer === true) components[i].style = "SUCCESS";
                components[i].label = `${components[i].label} (${components[i].timesChosen})`;
            }


            finalTrivia.row.components = components;

            console.log(finalTrivia);

            clearInterval(countdown);

            interaction
                .editReply({content: `Butts ${time}!`, components: [finalTrivia.row]});
        }, 4000);
    },
};