import { Message } from "discord.js"

module.exports = {
    name: 'flip',
    description: 'Flip a coin!',
    usage: "",
    execute(message: Message, args: any) {

        let sides = ['Heads', 'Tails']

        message.channel
            .send(sides[Math.floor(Math.random() * sides.length)])
    },
}