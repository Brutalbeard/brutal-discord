import { Message } from "discord.js";
import UserInfo from "../definitions/user-info"
import Poll from "../definitions/poll"
import db from "../lib/mongo-client"
import { parse } from "querystring";

module.exports = {
    name: 'endpoll',
    description: 'End a poll you created in this room',
    args: true,
    usage: "{poll id}",
    async execute(message: Message, args: any) {
        let today = new Date();
        let yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        await db.polls.updateOne({
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
    },
};