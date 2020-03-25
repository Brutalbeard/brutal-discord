import { Message } from "discord.js"
import getOrSetUser from '../lib/users'

module.exports = {
    name: 'roll',
    description: 'Roll some dice! Default is a roll 20',
    usage: "{number of dice}d{number of sides on the dice}",
    execute(message: Message, args: any) {

        getOrSetUser(message.author)

        let str = args.join('')
        let vals = str.split('d')

        let numberOfDice: number = vals[0] ? vals[0] : 1
        let numberOfSides: number = vals[1] ? vals[1] : 20

        let rolls: number[] = []
        let total: number = 0

        for (let i = 0; i < numberOfDice; i++) {
            let die = Math.floor(Math.random() * numberOfSides) + 1
            rolls.push(die)
            total += die
        }

        message.channel.send("Dice values: " + rolls.join(', ') + "\nTotal: " + total)
    },
}