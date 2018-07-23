import { Message } from "discord.js";
import db from "../lib/mongo-client";

module.exports = {
    name: 'db',
    description: 'Does a quick db insert, then find',
    usage: "",
    async execute(message: Message, args: any) {

        console.log(message.author)

        await db.users.insertOne(
            message.author
        ).catch(e =>{
            console.error(e)
        })

        let doc = await db.users.findOne({}).catch(e =>{
            console.error(e)
        })

        message.channel.send(JSON.stringify(doc)).catch(e =>{
            console.error(e)
        })
    },
};