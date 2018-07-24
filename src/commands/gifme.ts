import { Message } from "discord.js";
import { giphy_client } from "../lib/giphy_client";

module.exports = {
    name: 'gifme',
    description: 'Returns a random ass giphy gif based on your search term',
    usage: "{kid falling down}",
    args: true,
    async execute(message: Message, args: any) {

        let res: [] = await giphy_client.get('/search', {
            params: {
                q: args.join('+')
            }
        }).then(res =>{
            return res.data.data
        }).catch(e =>{
            console.error(e)
        })

        let gif = res[Math.floor(Math.random()*res.length)]

        let url = gif.images.original.webp ? gif.images.original.webp : gif.images.original.url

        message.channel.send(url);
    },
};