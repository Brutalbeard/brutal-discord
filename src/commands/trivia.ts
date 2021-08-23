import {SlashCommandBuilder} from '@discordjs/builders';
import {triviaClient} from "../lib/trivia-client";
import {MessageEmbed} from "discord.js";

const wait = require('util').promisify(setTimeout);

const waitTime = 8;

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
        .setDescription('Play some trivia together!'),

    async execute(interaction) {
        let embeddedQuestion = new MessageEmbed();
        let category = trivia_categories[0];

        let triviaBody = await triviaClient
            .get('/api.php', {
                params: {
                    amount: 1,
                    category: category.id,
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
                };

                let possibleAnswers = body.incorrect_answers;
                possibleAnswers.push(body.correct_answer);

                possibleAnswers = possibleAnswers.sort();

                let questionString = [];
                for (let i in possibleAnswers) {
                    questionString.push(`${parseInt(i) + 1} - ${possibleAnswers[i]}`);
                };

                embeddedQuestion
                    .setTitle(body.question)
                    .setDescription(questionString.join(",\n"));

                return body;
            })
            .catch(e => {
                console.error(e);
            });

        await interaction
            .reply({
                embeds: [embeddedQuestion]
            });

        await wait(waitTime * 1000);

        await interaction
            .editReply({
                embeds: [embeddedQuestion],
                content: "The answer is: **" + triviaBody.correct_answer + "!**"
        });

    },
};