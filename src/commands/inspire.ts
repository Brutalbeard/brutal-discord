import { Message, MessageEmbed } from "discord.js"
import axios from 'axios'

module.exports = {
    name: 'inspire',
    description: 'Get hit with a random ass quote',
    usage: "",

    async execute(message: Message, args: any) {

        let embed = new MessageEmbed

        await axios
            .get('https://quote-garden.herokuapp.com/api/v2/quotes/random')
            .then(res => {
                console.log(res.data)

                embed.setAuthor(res.data.quote.quoteAuthor)
                embed.setDescription(res.data.quote.quoteText)
            })
            .catch(e => {
                console.error(e)
            })

        message.channel.send(embed)
    }
}