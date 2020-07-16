import { Message } from "discord.js"
import db from "../lib/mongo-client"
import getOrSetUser from '../lib/users'

module.exports = {
    name: 'endpoll',
    description: 'End a poll you created in this room',
    args: true,
    usage: "{poll id}",
    async execute(message: Message, args: any) {
        let today = new Date()
        let yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        getOrSetUser(message.author)

        await db.polls
            .updateOne({
                room: message.channel.id,
                created_at: {
                    $gte: (yesterday)
                },
                poll_id: args[0],
                deleted: false,
                'poll_author.id': message.author.id
            }, {
                $set: {
                    deleted: true
                }
            })
            .then(() => {
                message.channel.send("Removed!")
            })
            .catch(e => {
                console.error(e)
            })
    },
}