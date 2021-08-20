"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namedDice = [
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
];
module.exports = {
    name: 'roll',
    description: 'Roll some dice! Default is a roll 20',
    usage: "{number of dice}d{number of sides on the dice}",
    execute: function (message, args) {
        if (args.length == 0) {
            var die = Math.floor(Math.random() * 20) + 1;
            message.channel
                .send("1d20: " + die);
        }
        args.forEach(function (die) {
            var vals = die.split('d');
            var foundDie = namedDice
                .find(function (element) {
                return element.cmds.includes(vals[1] || vals[2]);
            });
            if (foundDie) {
                var numberOfDice = vals[0] ? vals[0] : 1;
                var rolls = [];
                for (var i = 0; i < numberOfDice; i++) {
                    var rand = Math.floor(Math.random() * foundDie.values.length);
                    var die_1 = foundDie.values[rand];
                    rolls.push(die_1);
                }
                message.channel.send(foundDie.name + ": " + rolls.join(', '));
            }
            else {
                var numberOfDice = vals[0] ? vals[0] : 1;
                var numberOfSides = vals[1] ? vals[1] : 20;
                var rolls = [];
                var total = 0;
                for (var i = 0; i < numberOfDice; i++) {
                    var die_2 = Math.floor(Math.random() * numberOfSides) + 1;
                    rolls.push(die_2);
                    total += die_2;
                }
                message.channel
                    .send(numberOfDice + "d" + numberOfSides + ": " + rolls.join(', ') + "\nTotal: " + total);
            }
        });
    },
};
