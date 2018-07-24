import { Message } from "discord.js";

module.exports = {
    name: 'roll',
    description: 'Roll some dice! Example, !roll 1 d 6',
    usage: "[{number of dice}, d, {number of sides on the dice}]",
    execute(message: Message, args: any) {
        let nummberOfDice: number = args[0] ? args[0] : 1
        let numberOfSides: number = args[0] ? args[2] : 6

        let rolls: number[] = []
        let total: number = 0
        
        for(let i = 0; i < nummberOfDice; i++){
            let die = Math.floor(Math.random()*numberOfSides)
            rolls.push(die)
            total += die
        }

        message.channel.send("Dice values: " + rolls.join(', ') + "\nTotal: " + total)
    },
};