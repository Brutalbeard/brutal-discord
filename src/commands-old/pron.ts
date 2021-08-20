import { Message } from "discord.js"

module.exports = {
    name: 'porn',
    description: "I'm ashamed of myself",
    usage: "{one word search term}",
    args: true,
    execute(message: Message, args: any) {

        const Pornsearch = require('pornsearch')
            .search(args[0])

        Pornsearch
            .gifs()
            .then((res: any) => {
                message.author
                    .send(res[Math.floor(Math.random() * res.length)].webm)
            })
            .catch((e: any) => {
                console.error(e)
            })
    },
}