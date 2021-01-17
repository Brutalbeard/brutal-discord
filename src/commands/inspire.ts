import { Message, MessageEmbed } from "discord.js"
import axios from 'axios'

module.exports = {
    name: 'inspire',
    description: 'Get hit with a random ass quote',
    usage: "",

    async execute(message: Message, args: any) {

        let embed = new MessageEmbed

        await axios
            .get('https://api.quotable.io/random', {
                params: {
                    tags: "inspirational"
                }
            })
            .then(res => {
                // console.log(res.data)

                embed.setAuthor(res.data.author)
                embed.setDescription(res.data.content)
            })
            .catch(e => {
                console.error(e)
            })

        message.channel.send(embed)
    }
}