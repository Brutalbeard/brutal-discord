import { Message } from "discord.js"
import getOrSetUser from '../lib/users'

module.exports = {
    name: 'abuse',
    description: 'Be mean to someone!',
    args: true,
    usage: "{username}",
    execute(message: Message, args: any) {

        getOrSetUser(message.author)

        let first: String[] = [
            'LAZY',
            'STUPID',
            'INSECURE',
            'IDIOTIC',
            'SLIMY',
            'SLUTTY',
            'SMELLY',
            'POMPOUS',
            'COMMUNIST',
            'DICKNOSE',
            'PIE-EATING',
            'RACIST',
            'ELITIST',
            'WHITE TRASH',
            'DRUG-LOVING',
            'BUTTERFACE',
            'TONE DEAF',
            'UGLY',
            'CREEPY'
        ]

        let second: String[] = [
            'DOUCHE',
            'ASS',
            'TURD',
            'RECTUM',
            'BUTT',
            'COCK',
            'SHIT',
            'CROTCH',
            'BITCH',
            'TURD',
            'PRICK',
            'SLUT',
            'TAINT',
            'FUCK',
            'DICK',
            'BONER',
            'SHART',
            'NUT',
            'SPHINCTER'
        ]

        let third: String[] = [
            'PILOT',
            'CANOE',
            'CAPTAIN',
            'PIRATE',
            'HAMMER',
            'KNOB',
            'BOX',
            'JOCKEY',
            'NAZI',
            'WAFFLE',
            'GOBLIN',
            'BLOSSUM',
            'BISCUIT',
            'CLOWN',
            'SOCKET',
            'MONSTER',
            'HOUND',
            'DRAGON',
            'BALLOON'
        ]

        let response: String = args[0] + " you're a " + first[Math.floor(Math.random() * first.length)]
            + " " + second[Math.floor(Math.random() * second.length)] + " " + third[Math.floor(Math.random() * third.length)]

        message.channel
            .send(response)
    },
}