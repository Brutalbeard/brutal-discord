import { Message } from "discord.js";
import UserInfo from "../definitions/user-info"
import Poll from "../definitions/poll"
import db from "../lib/mongo-client"
import { parse } from "querystring";

module.exports = {
    name: 'vote',
    description: 'Cast your vote on a poll!',
    usage: "{poll id}, {voting option}",
    async execute(message: Message, args: any) {
        const text = []

        let today = new Date();
        let yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        let poll: Poll = await db.polls.findOne({
            room: message.channel.id,
            created_at: {
                $gte: (yesterday)
            },
            poll_id: args[0],
            deleted: false
        })

        let user: UserInfo = await db.users.findOne({
            id: message.author.id
        })

        console.log(poll)
        console.log(user)
        console.log(args)

        poll.voting_options.find(element =>{
            console.log(element)
            if(element.option === args[1]){
                element.voters.push(user)
            }
        })

        console.log(poll)

        await db.polls.replaceOne(
            {"_id": poll._id},
            poll
        )
    },
};