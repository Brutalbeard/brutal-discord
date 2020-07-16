import { Message } from "discord.js"
import getOrSetUser from '../lib/users'
import axios from 'axios'

module.exports = {
    name: 'catfact',
    description: 'Learn more about felines!',
    usage: "",
    async execute(message: Message, args: any) {
        getOrSetUser(message.author)

        let response = "Something went wrong :-/"

        await axios
            .get('https://catfact.ninja/fact')
            .then(res => {
                response = res.data.fact
            })
            .catch(e => {
                console.error(e)
            })

        message.channel.send(response)
    }
}