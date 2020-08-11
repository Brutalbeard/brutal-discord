import { Message, MessageEmbed } from "discord.js"
import axios from 'axios'
import * as moment from 'moment'

module.exports = {
    name: 'trump',
    description: 'Get some random ass stupid quote from the 45th President',
    usage: "",

    async execute(message: Message, args: any) {

        let embed = new MessageEmbed

        await axios
            .get('https://api.tronalddump.io/random/quote')
            .then(res => {

                embed.setAuthor(res.data._embedded.author[0].name)
                embed.setFooter(moment(res.data.appeared_at).format("dddd, MMMM Do YYYY, h:mm:ss a"))
                embed.setTitle("About - " + res.data.tags.join(','))
                embed.setDescription(res.data.value)
                embed.setURL(res.data._embedded.source[0].url)
            })
            .catch(e => {
                console.error(e)
            })

        message.channel.send(embed)
    }
}