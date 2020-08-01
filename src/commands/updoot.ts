import { Message, User } from "discord.js"
import db from "../lib/mongo-client"
import getOrSetUser from '../lib/users'

module.exports = {
    name: 'updoot',
    description: 'Give someone a doot! For fun!',
    usage: "{@username}",
    args: true,
    cooldown: 5,
    async execute(message: Message, args: any) {

        if (message.channel.type == 'dm') {
            message.channel
                .send("No updooting in a direct message to the bot you cheatin bastard")
            return
        }

        if (message.mentions.users.array().length < 1) { return }

        let user = await getOrSetUser(message.author)
        let mentionedUser = await getOrSetUser(message.mentions.users.array()[0])

        if (user.id == mentionedUser.id) {
            message.channel
                .send("Can't updoot yourself idiot.")
        } else if (user.id != mentionedUser.id) {
            db.users
                .updateOne({ id: mentionedUser.id }, {
                    $inc: { doots: 1 }
                })
                .then(() => {
                    message.channel.send("@" + mentionedUser.username + " now has " + (mentionedUser.doots + 1) + " doot(s)! Thanks " + user.username)
                })
                .catch((e: any) => {
                    console.error(e)
                    message.channel.send("Had an issue giving a doot :-/")
                })
        }
    },
}