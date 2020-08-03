import { Message, MessageEmbed } from "discord.js"
import { triviaClient } from '../lib/trivia-client'

const waitTime = 8

module.exports = {
    name: 'trivia',
    description: `Spark up some trivia fun! You get ${waitTime} seconds to answer...`,
    usage: "{some category} <- use \"!trivia categories\" to get the full list (defaults to General)",
    async execute(message: Message, args: any) {

        if (args[0] && args[0].toLowerCase() == "categories") {
            let arr = []
            trivia_categories.forEach(elem => {
                arr.push(elem.name)
            })

            return message.channel
                .send("Categories: " + arr.join(', '))
        }

        let category = trivia_categories[0]

        if (args[0]) {
            let regex = new RegExp(args[0], 'gmi')

            category = trivia_categories.find(elem => {
                return regex.test(elem.name)
            })
        }

        let embeddedQuestion = new MessageEmbed()

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

                let body = res.data.results[0]
                let keys = Object.keys(body)

                for (let key of keys) {
                    if (Array.isArray(body[key])) {
                        for (let i in body[key]) {
                            body[key][i] = Buffer.from(body[key][i], 'base64').toString()
                        }
                    }
                    else {
                        body[key] = Buffer.from(body[key], 'base64').toString()
                    }
                }

                let possibleAnswers = body.incorrect_answers
                possibleAnswers.push(body.correct_answer)

                possibleAnswers = possibleAnswers.sort()

                let questionString = []
                for (let i in possibleAnswers) {
                    questionString.push(`${parseInt(i) + 1} - ${possibleAnswers[i]}`)
                }

                embeddedQuestion.setTitle(body.question)
                embeddedQuestion.setDescription(questionString.join(",\n"))

                return body
            })
            .catch(e => {
                console.error(e)
            })


        message.channel
            .send(embeddedQuestion)
            .then(() => {
                setTimeout(() => {
                    message.channel
                        .send(`**${triviaBody.question}** --- ${triviaBody.correct_answer}`)
                }, waitTime * 1000)
            })

    },
}

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
]