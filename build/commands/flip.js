"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'flip',
    description: 'Flip a coin!',
    usage: "",
    execute: function (message, args) {
        var sides = ['Heads', 'Tails'];
        message.channel.send(sides[Math.floor(Math.random() * sides.length)]);
    },
};
