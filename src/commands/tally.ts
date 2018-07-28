import { Message } from "discord.js";
import db from "../lib/mongo-client";
import getOrSetUser from '../lib/users';

module.exports = {
    name: 'tally',
    description: 'Get a tally of a current poll',
    usage: "[poll id]",
    args: true,
    async execute(message: Message, args: any) {

        getOrSetUser(message.author)
        
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
                let names = element.voters.map(user => user.username)
                options.push("**" + element.option + "**(" + element.voters.length + ") \n" + names.join(', ') + "\n")
            })

            text.push(options.join("***********\n"))
            

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