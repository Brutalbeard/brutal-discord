import { Message } from "discord.js"
import getOrSetUser from '../lib/users'
import db from "../lib/mongo-client"

module.exports = {
    name: 'lop',
    description: 'Lop off someone else\'s appendage',
    usage: "!lop @Anarkytt",
    async execute(message: Message, args: any) {
        getOrSetUser(message.author)

        let appendages = [
            "left leg",
            "right leg",
            "third leg",
            "left arm",
            "right arm",
            "nose",
            "left ear",
            "right ear",
            "left pinky toe",
            "right pinky toe",
            "left nipple",
            "right nipple",
            "bottom lip",
            "upper lip"
        ]

        let user = await getOrSetUser(message.author)
        let mentionedUser = await getOrSetUser(message.mentions.users.array()[0])
        console.log(mentionedUser)

        if (mentionedUser.appendages == undefined) {
            mentionedUser.appendages = appendages
        }

        let index = Math.floor(Math.random() * mentionedUser.appendages.length)

        let appendage = mentionedUser.appendages[index]
        delete mentionedUser.appendages[index]
        let tempArr: string[] = []

        for (let index in mentionedUser.appendages) {
            if (mentionedUser.appendages[index] !== undefined) {
                tempArr.push(mentionedUser.appendages[index])
            }
        }
        
        console.log("Temp Lop Arr: ", tempArr)
        mentionedUser.appendages = tempArr 
        console.log("MEntioned USeR: ", mentionedUser)
        
        await db.users.updateOne({ id: mentionedUser.id }, {
            $set: { appendages: tempArr }
        }).then(() => {
            message.channel.send("@" + user.username + " just lopped off @" + mentionedUser.username + "'s " + appendage)
        }).catch(e => {
            console.error(e)
            message.channel.send("Had an issue lopping stuff off...")
        })
    }
}