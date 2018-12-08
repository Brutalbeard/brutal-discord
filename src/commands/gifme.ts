import { Message } from "discord.js";
import { giphy_client } from "../lib/giphy_client";
import getOrSetUser from '../lib/users';

module.exports = {
    name: 'gifme',
    description: 'Returns a random ass giphy gif based on your search term',
    usage: "{kid falling down}",
    args: true,
    async execute(message: Message, args: any) {
        getOrSetUser(message.author)

        await giphy_client.get('/search', {
            params: {
                q: args.join('+')
            }
        }).then(res => {
            let resArray = res.data.data
            let gif = resArray[Math.floor(Math.random() * resArray.length)]

            let url = gif.images.original.webp ? gif.images.original.webp : gif.images.original.url

            message.channel.send(url);
        }).catch(e => {
            console.error(e)
            message.channel.send("Error finding a gif for you: " + e.data.message);
        })
    },
};