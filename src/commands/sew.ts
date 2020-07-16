import { Message } from "discord.js"
import getOrSetUser from '../lib/users'
import db from "../lib/mongo-client"

module.exports = {
    name: 'sew',
    description: 'Sew a missing appendage back onto your friend. If you wanna.',
    usage: "!sew @Anarkytt",
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

        if (user.id == mentionedUser.id) {
            message.channel
                .send("Can't put your own appendages back on.")
            return
        }

        if (mentionedUser.appendages == undefined) {
            mentionedUser.appendages = appendages
        }

        let tempArr: string[] = []
        for (let index in appendages) {
            if (mentionedUser.appendages.includes(appendages[index])) {
                continue
            } else {
                tempArr.push(appendages[index])
            }
        }

        console.log("TempArr: ", tempArr)
        if (tempArr.length == 0) {
            message.channel
                .send("@" + mentionedUser.username + " didn't need anything sewed back on!")
            return
        }

        let index = Math.floor(Math.random() * tempArr.length)

        let appendage = tempArr[index]

        mentionedUser.appendages.push(appendage)

        await db.users
            .updateOne({ id: mentionedUser.id }, {
                $set: { appendages: mentionedUser.appendages }
            })
            .then(() => {
                message.channel.send("@" + user.username + " just sewed @" + mentionedUser.username + "'s " + appendage + " back on. Old Frankenstein ass.")
            })
            .catch((e: any) => {
                console.error(e)
                message.channel.send("Had an issue lopping stuff off...")
            })
    }
}