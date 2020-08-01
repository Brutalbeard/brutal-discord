import { Message } from "discord.js"

const namedDice = [ // this was for a start wars RPG game with my niece :-)
    {
        name: "Ability",
        cmds: ["ability", "abi"],
        values: ["Advantage", "Advantage", "Double Advantage", "Advantage/Success", "Success", "Success", "Double Success", "Blank"]
    },
    {
        name: "Boost",
        cmds: ["boost", "boo", "boos"],
        values: ["Advantage", "Double Advantage", "Advantage/Success", "Success", "Blank", "Blank"]
    },
    {
        name: "Proficiency",
        cmds: ["proficiency", "pro", "prof"],
        values: ["Blank", "Advantage", "Double Advantage", "Double Advantage", "Advantage/Success", "Advantage/Success", "Advantage/Success", "Success", "Success", "Double Success", "Double Success", "Triumph"]
    },
    {
        name: "Difficulty",
        cmds: ["difficulty", "diff", "dif", "if", "iff", "ifficulty"],
        values: ["Blank", "Threat", "Threat", "Threat", "Double Threat", "Threat/Failure", "Faliure", "Double Failure"]
    },
    {
        name: "Setback",
        cmds: ["setback", "sb", "set", "setb", "sback"],
        values: ["Blank", "Blank", "Threat", "Threat", "Faliure", "Faliure"]
    },
    {
        name: "Challenge",
        cmds: ["challenge", "chal", "chall"],
        values: ["Blank", "Threat", "Threat", "Double Threat", "Double Threat", "Threat/Failure", "Threat/Failure", "Double Failure", "Double Failure", "Despair"]
    }
]

module.exports = {
    name: 'roll',
    description: 'Roll some dice! Default is a roll 20',
    usage: "{number of dice}d{number of sides on the dice}",
    execute(message: Message, args: any) {

        args.forEach(die => {
            let vals = die.split('d')

            let foundDie = namedDice.find(element => {
                return element.cmds.includes(vals[1] || vals[2])
            })

            if (foundDie) {

                let numberOfDice: number = vals[0] ? vals[0] : 1

                let rolls: string[] = []

                for (let i = 0; i < numberOfDice; i++) {
                    let rand = Math.floor(Math.random() * foundDie.values.length)

                    let die = foundDie.values[rand]
                    rolls.push(die)
                }
                message.channel.send(foundDie.name + ": " + rolls.join(', '))

            } else {
                let numberOfDice: number = vals[0] ? vals[0] : 1
                let numberOfSides: number = vals[1] ? vals[1] : 20

                let rolls: number[] = []
                let total: number = 0

                for (let i = 0; i < numberOfDice; i++) {
                    let die = Math.floor(Math.random() * numberOfSides) + 1
                    rolls.push(die)
                    total += die
                }

                message.channel
                    .send("Dice values: " + rolls.join(', ') + "\nTotal: " + total)
            }

        })

    },
}