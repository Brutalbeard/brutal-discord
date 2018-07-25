import { Message } from "discord.js";
import getOrSetUser from '../lib/users'
import db from "../lib/mongo-client"

module.exports = {
    name: 'updoot',
    description: 'Give someone a doot! For fun!',
    usage: "{@username}",
    args: true,
    cooldown: 5,
    async execute(message: Message, args: any) {
        let user = await getOrSetUser(message.author)
        let mentionedUser = await getOrSetUser(message.mentions.users.array()[0])

        db.users.updateOne({id: mentionedUser.id}, {
            $inc: {doots: 1} 
        }).then(() =>{
            message.channel.send("@" + mentionedUser.username + " now has " + (mentionedUser.doots + 1) + " doot(s)! Thanks " + user.username)
        }).catch(e =>{
            console.error(e)
            message.channel.send("Had an issue giving a doot :-/")
        })
    },
};