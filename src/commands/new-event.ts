import { Message } from "discord.js";
import Event from '../definitions/event';
import db from "../lib/mongo-client";
import getOrSetUser from '../lib/users';

module.exports = {
    name: 'newevent',
    description: "Triggers the bot to help you setup a shiny new event in the room you're in.",
    usage: "",
    async execute(message: Message, args: any) {
        let user = await getOrSetUser(message.author)

        let newEvent: Event = {
            created_at: new Date(),
            updated_at: new Date(),
            room: message.channel.id
        };

        newEvent.organizer = user

        const filter = response => {
            return response.author.id == message.author.id;
        };

        message.author.send("What do you want to name the event?").then(() =>{
            message.author.dmChannel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] }).then(collected =>{
                newEvent.title = collected.first().content
            }).then(() =>{
                message.author.send("When is the event? ex. MM/DD/YYYY").then(() =>{
                    message.author.dmChannel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] }).then(collected =>{
                        let d = new Date(collected.first().content)
                        newEvent.date = d
                    }).then(() =>{
                        message.author.send("Descibe what's goin on").then(() =>{
                            message.author.dmChannel.awaitMessages(filter, { maxMatches: 1, time: 60000, errors: ['time'] }).then(collected =>{
                                newEvent.description = collected.first().content
                            }).then(async () =>{
                                await db.events.insertOne(
                                    newEvent
                                ).then(() =>{
                                    message.author.send("New event created! Have fun!")
                                    message.channel.send({
                                        embed: {
                                            color: 3447003,
                                            description: "**" + newEvent.title + ":** \n\t" + newEvent.description + " " + "\n\tOrganized by @" + newEvent.organizer.username + "\n\tWhen: " + newEvent.date.toDateString()
                                        }
                                    })
                                }).catch(e =>{
                                    message.author.send("There was an issue creating your event. :-/")
                                    console.error(e)
                                })
                            }).catch(collected =>{
                                message.author.send("Invalid response!")
                            })
                        })
                    }).catch(collected =>{
                        message.author.send("Invalid response!")
                    })
                })
            }).catch(collected =>{
                message.author.send("Invalid response!")
            })
        })
        
    },
};