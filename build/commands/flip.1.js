"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../lib/users");
module.exports = {
    name: 'flip',
    description: 'Flip a coin!',
    usage: "",
    execute: function (message, args) {
        users_1.default(message);
        var sides = ['Heads', 'Tails'];
        message.channel.send(sides[Math.floor(Math.random() * sides.length)]);
    },
};
