import { Message } from "discord.js"
import Poll from "../definitions/poll"
import db from "../lib/mongo-client"
import getOrSetUser from '../lib/users'


module.exports = {
    name: 'polls',
    description: 'View all the currently available polls for this chat room',
    usage: "",
    async execute(message: Message, args: any) {

        getOrSetUser(message.author)

        const text = []

        let today = new Date()
        let yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        let polls: Poll[] = await db.polls.find({
            room: message.channel.id,
            created_at: {
                $gte: (yesterday)
            },
            deleted: false
        }).toArray()

        for (let index in polls) {
            let poll: Poll = polls[index]
            let options = []
            poll.voting_options.forEach(element => {
                options.push(element.option)
            })


            text.push("ID: " + poll.poll_id + " - Question: \"" + poll.question + "\" - Options: " + options.join(' | '))
        }
        if (polls.length == 0) {
            text.push("No polls available")
        }

        message.channel.send({
            embed: {
                color: 3447003,
                description: text.join("\n")
            }
        })
    },
}