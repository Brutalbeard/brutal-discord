import { Message } from "discord.js"
import axios from 'axios'

module.exports = {
    name: 'joke',
    description: 'Hear a random joke. Hope it\'s funny',
    usage: "",

    async execute(message: Message, args: any) {

        let response = "Something went wrong :-/"

        await axios
            .get('https://sv443.net/jokeapi/v2/joke/Any?type=single')
            .then(res => {
                // console.log(res.data)
                response = res.data.joke
            })
            .catch(e => {
                console.error(e)
            })

        message.channel.send(response)
    }
}