import { Message } from "discord.js";
import db from "../lib/mongo-client";
import UserInfo from '../definitions/user-info'

module.exports = {
    name: 'db',
    description: 'Does a quick db insert, then find',
    usage: "",
    async execute(message: Message, args: any) {

        // console.log(message.author.)

        let dbUser: UserInfo = {
            id: message.author.id,
            username: message.author.username,
            bot: message.author.bot,
            avatar: message.author.avatar,
            avatarURL: message.author.avatarURL
        }

        let user: UserInfo = await db.users.findOne({
            id: message.author.id
        }).catch(e =>{
            console.error(e)
        })
        
        let users = await db.users.find({}).toArray()

        console.log(users)

        if(!user.id){
            await db.users.insertOne(
                dbUser
            ).catch(e =>{
                console.error(e)
            })
        }
        message.channel.send(JSON.stringify(user.username)).catch(e =>{
            console.error(e)
        })
    },
};