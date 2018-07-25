import { Message } from "discord.js";
import { apod_client } from "../lib/apod-client";
import getOrSetUser from '../lib/users'

module.exports = {
    name: 'apod',
    description: "Astronomy Picture of the Day! If you use just the 'apod' command, today's APOD will show up. Optionally you can say 'apod random', and I'll pick one out of a hat.",
    usage: "(options: [random])",
    async execute(message: Message, args: any) {

        getOrSetUser(message.author)

        let queryDate = null

        if(args[0] === 'random'){
            queryDate = randomDate(new Date(1998, 0, 1), new Date())
        }

        let res = await apod_client.get('/apod', {
            params: {
                date: queryDate,
                api_key: process.env['APOD_KEY']
            }
        }).then(res =>{
            return res.data
        }).catch(e => {
            console.error(e)
        })

        message.channel.send({embed: {
            color: 3447003,
            title: res.title,
            description: res.explanation,
            image: {
                url: res.hdurl
            },
            footer: {
                text: res.copyright ? "Credit: " + res.copyright: null
            },
            timestamp: new Date(res.date)
          }});
    },
};

function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}