import { Message } from "discord.js";
import getOrSetUser from '../lib/users'

module.exports = {
    name: 'flip',
    description: 'Flip a coin!',
    usage: "",
    execute(message: Message, args: any) {
        getOrSetUser(message.author)

        let sides = ['Heads', 'Tails']

        message.channel.send(sides[Math.floor(Math.random()*sides.length)]);
    },
};