import { SlashCommandBuilder } from '@discordjs/builders';
import { triviaClient } from "../lib/trivia-client";
import db from '../lib/mongo-client';
import * as Chance from 'chance';

const chance = new Chance();

const defaultTime = 10;

const winners = [
    "Geniuses",
    "Einsteins",
    "Educated Ones",
    "Lucky Guessers",
    "Show Offs",
    "Smarty Pants'",
    "Winners"
];

const losers = [
    "Idiots",
    "Morons",
    "Losers",
    "Simpletons",
    "Disappointments",
    "Dumb asses"
]

const trivia_categories = [
    {
        "id": 9,
        "name": "General Knowledge"
    },
    {
        "id": 10,
        "name": "Entertainment: Books"
    },
    {
        "id": 11,
        "name": "Entertainment: Film"
    },
    {
        "id": 12,
        "name": "Entertainment: Music"
    },
    {
        "id": 13,
        "name": "Entertainment: Musicals & Theatres"
    },
    {
        "id": 14,
        "name": "Entertainment: Television"
    },
    {
        "id": 15,
        "name": "Entertainment: Video Games"
    },
    {
        "id": 16,
        "name": "Entertainment: Board Games"
    },
    {
        "id": 17,
        "name": "Science & Nature"
    },
    {
        "id": 18,
        "name": "Science: Computers"
    },
    {
        "id": 19,
        "name": "Science: Mathematics"
    },
    {
        "id": 20,
        "name": "Mythology"
    },
    {
        "id": 21,
        "name": "Sports"
    },
    {
        "id": 22,
        "name": "Geography"
    },
    {
        "id": 23,
        "name": "History"
    },
    {
        "id": 24,
        "name": "Politics"
    },
    {
        "id": 25,
        "name": "Art"
    },
    {
        "id": 26,
        "name": "Celebrities"
    },
    {
        "id": 27,
        "name": "Animals"
    },
    {
        "id": 28,
        "name": "Vehicles"
    },
    {
        "id": 29,
        "name": "Entertainment: Comics"
    },
    {
        "id": 30,
        "name": "Science: Gadgets"
    },
    {
        "id": 31,
        "name": "Entertainment: Japanese Anime & Manga"
    },
    {
        "id": 32,
        "name": "Entertainment: Cartoon & Animations"
    }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Play some trivia together!')
        .addIntegerOption(number => {
            number
                .setName("timer")
                .setDescription("How long to wait for people to answer before revealing answer")
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

        let category = trivia_categories[0];

        let myId = chance.guid();

        let newTrivia = {
            id: myId,
            smartUsers: [],
            dumbUsers: [],
            row: {
                components: [],
                //@ts-ignore
                type: 1
            }
        };

        let triviaBody = await triviaClient
            .get('/api.php', {
                params: {
                    amount: 1,
                    category: trivia_categories[chance.integer({ min: 0, max: trivia_categories.length - 1 })].id,
                    type: 'multiple',
                    difficulty: 'easy',
                    encode: "base64"
                }
            })
            .then(async res => {
                let body = res.data.results[0];
                let keys = Object.keys(body);

                for (let key of keys) {
                    if (Array.isArray(body[key])) {
                        for (let i in body[key]) {
                            body[key][i] = Buffer.from(body[key][i], 'base64').toString();
                        }
                    } else {
                        body[key] = Buffer.from(body[key], 'base64').toString();
                    }
                }

                return body;
            })
            .catch(e => {
                console.error(e);
            });


        let possibleAnswers = triviaBody.incorrect_answers;
        possibleAnswers.push(triviaBody.correct_answer);

        possibleAnswers = possibleAnswers.sort();

        let questionString = [];
        for (let i in possibleAnswers) {
            newTrivia
                .row
                .components
                .push({
                    custom_id: `${myId}-${i}`,
                    disabled: false,
                    emoji: null,
                    label: possibleAnswers[i],
                    style: 2,
                    type: 2,
                    url: null,
                    correctAnswer: possibleAnswers[i] == triviaBody.correct_answer ? true : false,
                    timesChosen: 0
                });
        }

        await db
            .trivia
            .insertOne(newTrivia)
            .catch(e => {
                console.error("DB ERROR: ", e);
            });

        let intervalTime = providedTimer ? providedTimer.value : defaultTime;
        let timeoutTime = intervalTime;

        await interaction
            .reply({
                content: `**${triviaBody.question}**\n\nTime Left to Answer: **${intervalTime}**`,
                components: [newTrivia.row]
            });

        let countdown = setInterval(() => {
            intervalTime -= 1;
            interaction
                .editReply({
                    content: `**${triviaBody.question}**\n\nTime Left to Answer: **${intervalTime}**`,
                    components: [newTrivia.row]
                });
        }, 1000);

        setTimeout(async () => {
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

            clearInterval(countdown);

            interaction
                .editReply({
                    content: `**${triviaBody.question}**\n${winners[chance.integer({
                        min: 0,
                        max: winners.length - 1
                    })]}: ${finalTrivia.smartUsers.join(", ")}\n${losers[chance.integer({
                        min: 0,
                        max: losers.length - 1
                    })]}: ${finalTrivia.dumbUsers.join(", ")}`,
                    components: [finalTrivia.row]
                });
        }, timeoutTime * 1000);
    },
};