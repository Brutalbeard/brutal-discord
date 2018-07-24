import { Message } from "discord.js";
import { ud_client } from "../lib/urban-dictionary";

module.exports = {
    name: 'ud',
    description: 'Returns a definition of some awful phrase from ubran dictionary',
    usage: "{alabama hot pocket}",
    args: true,
    async execute(message: Message, args: any) {

        let res = await ud_client.get('/define', {
            params: {
                term: args.join('+')
            }
        }).then(res =>{
            return res.data.list
        }).catch(e =>{
            console.error(e)
        })

        message.channel.send({
            embed:{
                color: 3447003,color: 3447003,
                author: {
                    name: "Author: " + res[0].author
                },
                description: res[0].definition.replace(/\[|\]/g, '') + "\n\n**Example:** " + res[0].example.replace(/\[|\]/g, ''),
                title: res[0].word
            }
        });
    },
};