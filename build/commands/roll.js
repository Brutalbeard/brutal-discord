"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'roll',
    description: 'Roll some dice! Example, !roll 1 d 6',
    usage: "[{number of dice}, d, {number of sides on the dice}]",
    execute: function (message, args) {
        var nummberOfDice = args[0] ? args[0] : 1;
        var numberOfSides = args[0] ? args[2] : 6;
        var rolls = [];
        var total = 0;
        for (var i = 0; i < nummberOfDice; i++) {
            var die = Math.floor(Math.random() * numberOfSides) + 1;
            rolls.push(die);
            total += die;
        }
        message.channel.send("Dice values: " + rolls.join(', ') + "\nTotal: " + total);
    },
};
