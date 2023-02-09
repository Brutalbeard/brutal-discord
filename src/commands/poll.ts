import { SlashCommandBuilder } from '@discordjs/builders';
import db from '../lib/mongo-client';
import * as Chance from 'chance';

const chance = new Chance();

const defaultTime = 15;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Setup a question to vote on anonymously')
        .addStringOption(string => {
            string
                .setName("question")
                .setDescription("Comma separated list of answers to the question")
                .setRequired(true);

            return string;
        })
        .addStringOption(string => {
            string
                .setName("answers")
                .setDescription("Comma separated list of answers to the question")
                .setRequired(true);

            return string;
        })
        .addIntegerOption(number => {
            number
                .setName("timer")
                .setDescription("How long to wait for people to answer.")
                .setRequired(false);

            return number;
        }),

    async execute(interaction) {
        let providedTimer = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'timer'
            });

        let question = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'question'
            });

        let answers = interaction
            .options
            ._hoistedOptions
            .find(element => {
                return element.name === 'answers'
            });

        let myId = chance.guid();

        let newPoll = {
            id: myId,
            row: {
                components: [],
                //@ts-ignore
                type: 1
            },
            question: question.value,
            usersThatAnsweredAlready: []
        };

        if (answers) {
            answers = answers.value.split(',');
        }

        if (answers.length < 2) {
            interaction
                .reply({
                    content: "Gotta give at least 2 possible choices, comma separated",
                    ephemeral: true
                });

            return;
        }

        for (let i in answers) {
            newPoll
                .row
                .components
                .push({
                    custom_id: `${myId}-${i}`,
                    disabled: false,
                    emoji: null,
                    label: answers[i],
                    style: 2,
                    type: 2,
                    url: null,
                    timesChosen: 0
                });
        }

        await db
            .polls
            .insertOne(newPoll)
            .catch(e => {
                console.error("DB ERROR: ", e);
            });

        let intervalTime = providedTimer ? providedTimer.value : defaultTime;
        let timeoutTime = intervalTime;

        await interaction
            .reply({
                content: `**${question.value}**\n\nTime Left to Answer: **${intervalTime}**`,
                components: [newPoll.row]
            });

        let countdown = setInterval(() => {
            intervalTime -= 1;
            interaction
                .editReply({
                    content: `**${question.value}**\n\nTime Left to Answer: **${intervalTime}**`,
                    components: [newPoll.row]
                });
        }, 1000);

        setTimeout(async () => {
            let finalPoll = await db
                .polls
                .findOne({
                    id: myId
                }).then(res => {
                    return res;
                }).catch(e => {
                    console.error(e);
                });

            let components = finalPoll.row.components;

            await components.sort((a, b) => {
                return a.timesChosen - b.timesChosen;
            }).reverse();

            for (let i = 0; i < components.length; i++) {
                components[i].disabled = true;
                if (i == 0) {
                    components[i].style = "SUCCESS";
                }
                components[i].label = `${components[i].label} (${components[i].timesChosen})`;
            }

            finalPoll.row.components = components;

            clearInterval(countdown);

            interaction
                .editReply({
                    content: `**${question.value}**`,
                    components: [finalPoll.row]
                });
        }, timeoutTime * 1000);
    },
};