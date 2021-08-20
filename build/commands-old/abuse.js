"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'abuse',
    description: 'Be mean to someone!',
    args: true,
    usage: "{username}",
    execute: function (message, args) {
        var first = [
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
            'SHIT-EATING',
            'RACIST',
            'ELITIST',
            'WHITE TRASH',
            'DRUG-LOVING',
            'BUTTERFACE',
            'TONE DEAF',
            'UGLY',
            'CREEPY',
            'SKANKY',
            'CUM-GUZZLING'
        ];
        var second = [
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
            'SPHINCTER',
            'NIPPLE'
        ];
        var third = [
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
            'BALLOON',
            'HOLE',
            'SUCKER'
        ];
        var response = args[0] + " you're a " + first[Math.floor(Math.random() * first.length)]
            + " " + second[Math.floor(Math.random() * second.length)] + " " + third[Math.floor(Math.random() * third.length)];
        message.channel
            .send(response);
    },
};
