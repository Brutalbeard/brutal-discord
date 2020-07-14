import { Message } from "discord.js"
import getOrSetUser from '../lib/users'
import fetch from 'node-fetch'

module.exports = {
    name: 'catfact',
    description: 'Learn more about felines!',
    usage: "",
    async execute(message: Message, args: any) {
        getOrSetUser(message.author)

        let response = "Something went wrong :-/"

        let catFact = await fetch('https://catfact.ninja/fact')
            .then(res =>{
                return res.json()
            })
            .then(res =>{
                response = res.fact
            })
            .catch(e =>{
                console.error("Issue loading a cat fact!: ", e)
            })

        message.channel.send(response)
    }
}