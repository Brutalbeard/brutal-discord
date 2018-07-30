import { Message } from "discord.js";
import db from "../lib/mongo-client";
import getOrSetUser from '../lib/users';

module.exports = {
    name: 'downdoot',
    description: 'Take a doot from someone, but it costs you a doot!',
    usage: "{@username}",
    args: true,
    cooldown: 5,
    async execute(message: Message, args: any) {
        let user = await getOrSetUser(message.author)
        let mentionedUser = await getOrSetUser(message.mentions.users.array()[0])

        if(user.doots <= 0){
            message.channel.send("No downdooting for you! You don't have any doots to spend! If only people liked you more.")
        }else if(user.id == mentionedUser.id){
            message.channel.send("Can't downdoot yourself dumbass!")
        }else if(user.id != mentionedUser.id)(

            db.users.updateOne({id: mentionedUser.id}, {
                $inc: {doots: -1} 
            }).then(() =>{
                message.channel.send("@" + mentionedUser.username + " now has " + (mentionedUser.doots - 1) + " doot(s)!\n")
            }).catch(e =>{
                console.error(e)
                message.channel.send("Had an issue giving a doot :-/")
            })

            &&

            db.users.updateOne({id: user.id}, {
                $inc: {doots: -1} 
            }).then(() =>{
                message.channel.send("@" + user.username + " now has " + (user.doots - 1) + " doot(s)!")
            }).catch(e =>{
                console.error(e)
                message.channel.send("Had an issue giving a doot :-/")
            })

        )
    },
};