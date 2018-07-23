import { Message } from "discord.js";

module.exports = {
    name: 'ping',
    description: 'Ping!',
    usage: "Ping : Pong",
    execute(message: Message, args: any) {
        message.channel.send('Pong!');
    },
};