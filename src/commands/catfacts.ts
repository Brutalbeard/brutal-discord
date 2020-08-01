import { Message } from "discord.js"
import axios from 'axios'
import * as random from 'random'

module.exports = {
    name: 'catfact',
    description: 'Learn more about felines!',
    usage: "",

    async execute(message: Message, args: any) {

        let response = "Something went wrong :-/"

        const catEmojiArray = [
            ':cat:',
            ':crying_cat_face:',
            ':heart_eyes_cat:',
            ':joy_cat:',
            ':kissing_cat:',
            ':pouting_cat:',
            ':scream_cat:',
            ':smile_cat:',
            ':smiley_cat:',
            'smirk_cat:'
        ]

        await axios
            .get('https://catfact.ninja/fact')
            .then(res => {
                response = res.data.fact
            })
            .catch(e => {
                console.error(e)
            })

        message.channel.send(response + "\n" + catEmojiArray[random.int(0, catEmojiArray.length - 1)])
    }
}