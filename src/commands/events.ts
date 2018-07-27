import { Message } from "discord.js";
import Event from "../definitions/event";
import db from "../lib/mongo-client";
import getOrSetUser from '../lib/users';


module.exports = {
    name: 'events',
    description: 'View all the current and upcoming events in this room!',
    usage: "",
    async execute(message: Message, args: any) {

        getOrSetUser(message.author)
        
        const text = []

        let today = new Date();
        let yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        let events: Event[] = await db.events.find({
            room: message.channel.id,
            created_at: {
                $gte: (yesterday)
            }
        }).toArray()

        for(let event of events){
            text.push("**" + event.title + ":** \n\t" + event.description + " " + "\n\tOrganized by @" + event.organizer.username + "\n\tWhen: " + event.date.toDateString())
        }

        if(args[0] == 'all'){
            message.channel.send("@everyone", {
                embed: {
                    color: 3447003,
                    description: text.join("\n\n")
                }
            })
        }else if(args[0] == 'here'){
            message.channel.send("@here", {
                embed: {
                    color: 3447003,
                    description: text.join("\n\n")
                }
            })
        }else{
            message.channel.send({
                embed: {
                    color: 3447003,
                    description: text.join("\n\n")
                }
            })
        }
        
    },
};