import { Message } from "discord.js"

module.exports = {
    name: 'ping',
    description: 'Check upness!',
    usage: "",
    execute(message: Message, args: any) {

        message.channel
            .send("Pong!")
    },
}