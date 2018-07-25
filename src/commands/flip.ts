import { Message } from "discord.js";
import getOrSetUser from '../lib/users'

module.exports = {
    name: 'flip',
    description: 'Flip a coin!',
    usage: "",
    args: true,
    execute(message: Message, args: any) {
        getOrSetUser(message)

        let sides = ['Heads', 'Tails']

        message.channel.send(sides[Math.floor(Math.random()*sides.length)]);
    },
};