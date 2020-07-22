import { Message } from "discord.js"
import UserInfo from "../definitions/user-info"
import db from "../lib/mongo-client"
import getOrSetUser from '../lib/users'

module.exports = {
    name: 'vote',
    description: 'Cast your vote on a poll!',
    usage: "{poll id}, {voting option}",
    args: true,
    async execute(message: Message, args: any) {

        let today = new Date()
        let yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        let user: UserInfo = await getOrSetUser(message.author)

        await db.polls
            .findOne({
                room: message.channel.id,
                created_at: {
                    $gte: (yesterday)
                },
                poll_id: args[0],
                deleted: false
            })
            .then(async poll => {

                let okToVote = true

                poll.voting_options.find(element => {

                    for (let voter of element.voters) {
                        if (voter.id == user.id) {
                            okToVote = false
                            message.author.send("You've already voted on this poll")
                        }
                    }
                    if (element.option === args[1] && okToVote === true) {
                        element.voters.push(user)
                        db.polls
                            .replaceOne(
                                { "_id": poll._id },
                                poll
                            )
                            .then(() => {
                                message.author.send("Vote counted!")
                            })
                            .catch((e: any) => {
                                console.error(e)
                                message.channel.send("Issue counting your vote :=/")
                            })
                    }
                })

            })
            .catch((e: any) => {
                console.error("Poll not found")
                message.channel
                    .send("Poll not found")
            })
    },
}