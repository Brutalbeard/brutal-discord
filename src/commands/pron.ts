import { Message } from "discord.js";
import getOrSetUser from '../lib/users';

module.exports = {
    name: 'porn',
    description: "I'm ashamed of myself",
    usage: "{one word search term}",
    args: true,
    execute(message: Message, args: any) {
        getOrSetUser(message.author)

        const Pornsearch = require('pornsearch').search(args[0]);

        console.log(args[0])

        Pornsearch.gifs().then(res =>{
            console.log(res[0])
            message.author.send(res[Math.floor(Math.random()*res.length)].webm)
        }).catch(e =>{
            console.error(e)
        })
    },
};