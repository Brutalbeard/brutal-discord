import { Message } from "discord.js";
import getOrSetUser from '../lib/users'
import Poll from "../definitions/poll"
import db from "../lib/mongo-client"

module.exports = {
    name: 'tally',
    description: 'Get a tally of a current poll',
    usage: "[poll id]",
    args: true,
    async execute(message: Message, args: any) {

        getOrSetUser(message)
        
        const text = []

        let today = new Date();
        let yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        await db.polls.findOne({
            room: message.channel.id,
            created_at: {
                $gte: (yesterday)
            },
            poll_id: args[0],
            deleted: false
        }).then(poll =>{
            let options = []
            poll.voting_options.forEach(element =>{
                options.push(element.option + "(" + element.voters.length + ")")
            })

            text.push("Options: " + options.join(' | '))
            

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: poll.poll_author.username,
                        icon_url: poll.poll_author.avatarURL
                    },
                    description: text.join("\n"),
                    title: "ID: " + poll.poll_id + " - " + poll.question
                }
            })
        }).catch(e =>{
            console.error(e)
            message.channel.send("Poll not found")
        })

        
    },
};